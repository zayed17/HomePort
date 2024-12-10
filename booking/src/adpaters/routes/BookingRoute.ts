import express, { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import axios from 'axios'
import BookingModel from "../../infrastrucuture/mongoDb/models/BookingModel";
import UserModel from "../../infrastrucuture/mongoDb/models/UserModel";
import PropertyModel from "../../infrastrucuture/mongoDb/models/PropertyModel";
const stripe = new Stripe('sk_test_51Pkesm094jYnWAeuaCqHqijaQyfRv8avZ38f6bEUyTy7i7rVbOc8oyxFCn6Ih1h2ggzloqcECKBcach0PiWH8Jde00yYqaCtTB');
import { authenticateToken } from 'homepackage'
import { RabbitMQPublisher } from '../../infrastrucuture/rabbitmq/rabbitmqPublisher';
import { CloseDealUseCase } from '../../useCase'
import { BookingRepository } from '../../repositories/implementation/BookingRepository';
import { BookingController } from "../controller/BookingController";

import { Types } from "mongoose";

const router = Router();

const endpointSecret = 'whsec_QHcpQyNgYpG7ofY17pOwjRPuRGO03wOU';
const convertToISODate = (bookingDate: { day: number; month: number; year: number }): string => {
  const { day, month, year } = bookingDate;
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};
const rabbitMQPublisher = new RabbitMQPublisher()
const bookingRepository = new BookingRepository()

const closeDealUseCase = new CloseDealUseCase(bookingRepository,rabbitMQPublisher)

const bookingController = new BookingController(closeDealUseCase)


router.post('/make-payment', authenticateToken(['user']), async (req: any, res) => {
  const { amount, propertyId, bookingDate } = req.body;
  const userId = req.user._id
  console.log(req.body)
  const bookingDateString = convertToISODate(bookingDate)
  console.log(bookingDateString)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Property Booking',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://homeport.online/payment-success?session_id={CHECKOUT_SESSION_ID}&property_id=${propertyId}&booking_date=${encodeURIComponent(bookingDate)}`,
      cancel_url: 'https://homeport.online/payment-error',
      metadata: {
        propertyId,
        userId,
        bookingDate: bookingDateString,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/booking', async (req: any, res: Response) => {
  const publisher = new RabbitMQPublisher();

  const sig = req.headers['stripe-signature'] as string;
  const rawBody = req.body as Buffer;

  if (!sig) {
    return res.status(400).send('Missing Stripe signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session, "chcking id ")
    const userId = session?.metadata?.userId;
    const propertyId = session?.metadata?.propertyId;
    const bookingDate = session?.metadata?.bookingDate;
    const amountPaid = session.amount_total! / 100;

    try {
      console.log(propertyId, "id consoling")
      const propertyResponse = await axios.get(`https://api.homeport.online/api/property/property/${propertyId}`);
      const propertyData = propertyResponse.data;
      console.log(propertyData)
      if (!propertyData) {
        console.error('Property not found');
        return res.status(404).send('Property not found');
      }

      const filteredProperty = {
        _id: propertyData._id,
        address: propertyData.address,
        image: propertyData.mediaFiles[0],
        availableFrom: propertyData.availableFrom,
        listingType: propertyData.listingType,
        rentAmount: propertyData.rentAmount,
        sellPrice: propertyData.sellPrice,
        depositAmount: propertyData.depositAmount,
        createdBy: {
          _id: propertyData.createdBy._id,
          name: propertyData.createdBy.name,
          email: propertyData.createdBy.email,
          phone: propertyData.createdBy.phone
        }
      };

      const userResponse = await axios.get(`https://api.homeport.online/api/user/details/${userId}`);
      const userData = userResponse.data;
      console.log(userData)
      if (!userData) {
        console.error('User not found');
        return res.status(404).send('User not found');
      }


      const filteredUser = {
        _id: userData._id,
        name: userData.firstName,
        email: userData.email,
        phone: userData.phone
      };


      const newBooking = new BookingModel({
        userId: filteredUser._id,
        propertyId: filteredProperty._id,
        bookingDate: bookingDate,
        totalAmount: amountPaid,
        amountPaid: amountPaid.toFixed(2),
        status: 'pending',
        paymentMethod: session.payment_method_types[0] || 'other',
        transactionId: session.id,
      });

      await newBooking.save();
      const fullname = userData.firstName + " " + userData.lastName
      await UserModel.findByIdAndUpdate(filteredUser._id, filteredUser, { upsert: true, new: true });
      await PropertyModel.findByIdAndUpdate(filteredProperty._id, filteredProperty, { upsert: true, new: true });
      const bookingDateObj = bookingDate ? new Date(bookingDate) : new Date();
      const bookingId = (newBooking._id as Types.ObjectId).toString();

      await publisher.publishBookingData(filteredProperty._id, userId!, bookingDateObj, fullname, amountPaid,bookingId)
      res.json({ received: true });
    } catch (error) {
      console.error('Error handling Stripe webhook:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).end();
  }
});


router.get('/get-booking', authenticateToken(['user']), async (req: any, res: Response) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit)

  try {
    const totalItems = await BookingModel.countDocuments({ userId });
    const properties = await BookingModel.find({ userId }).populate('userId').populate('propertyId').skip((page - 1) * limit) .limit(limit); 

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      properties,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error:any) {
    console.error("Error fetching bookings:", error.message, error.stack); // Log detailed error
    res.status(500).json({ message: "Server error", error: error.message ,errorStack: error.stack}); // Include error message for debugging
  }
});

router.patch('/close-deal',(req, res, next) => bookingController.closeDeal(req, res, next));


export default router;