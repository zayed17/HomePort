import React, { useState } from 'react'; import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/propertyApi';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { loadStripe } from '@stripe/stripe-js';
import { FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useMakePaymentMutation } from '../../store/bookingApi';
import toast from 'react-hot-toast';
const stripePromise =  loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!); 

const BookingMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false)
  const { data: property, error, isLoading } = useGetPropertyQuery(id || '');
  const availableFrom = new Date(property?.availableFrom);
  const minDate = {
    year: availableFrom.getFullYear(),
    month: availableFrom.getMonth() + 1,
    day: availableFrom.getDate(),
  };

  const [payment] = useMakePaymentMutation()
  const [selectedDay, setSelectedDay] = useState();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-Lightext-LightdarkBlue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-600 text-xl">Error loading property details. Please try again later.</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600 text-xl">Property not found.</p>
      </div>
    );
  }

  const fixedBookingFee = 5000;
  const depositAmount = property.lookingFor === 'rent'
    ? property.depositAmount
    : Math.min(property.sellPrice * 0.05, 50000);

  const totalAmount = depositAmount + fixedBookingFee;

  const handleBooking = async () => {
    if (!selectedDay) {
      toast.error("Select a Booking Date");
      return;
    }
  
    setLoading(true); // Set loading to true when the booking process starts
  
    try {
      const { id: sessionId } = await payment({ amount: totalAmount * 100, propertyId: property._id, bookingDate: selectedDay }).unwrap();
      const stripe = await stripePromise;
      const { error } = await stripe?.redirectToCheckout({ sessionId });
  
      if (error) {
        toast.error(error.message);
        console.error('Payment failed', error);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.error('Payment failed', error);
    } finally {
      setLoading(false); // Set loading to false after the process ends
    }
  }


  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <div className="relative mb-8">
                <img
                  src={property.mediaFiles[0] || '/path/to/default/image.jpg'}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h1 className="text-4xl font-extrabold">{property.title}</h1>
                  <p className="text-xl mt-2">{property.address}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Property Details</h2>
                <div className="grid grid-cols-2 text-lg md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <FaBed className="text-LightdarkBlue mr-2" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-LightdarkBlue mr-2" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-LightdarkBlue mr-2" />
                    <span>{property.totalArea} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-LightdarkBlue mr-2" />
                    <span>Available Now</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Property Owner</h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <FaUserCircle className="text-4xl text-LightdarkBlue mr-4" />
                    <div>
                      <p className="font-semibold text-lg">{property.createdBy.name}</p>
                      <p className="text-gray-600">Property Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="text-LightdarkBlue mr-2" />
                    <span>{property.createdBy.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-LightdarkBlue mr-2" />
                    <span>{property.createdBy.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Booking is subject to property availability.</li>
                  <li>Ensure all payment details are accurate before confirming.</li>
                  <li>Cancellations may be subject to a fee.</li>
                  <li>Property viewing can be scheduled prior to booking confirmation.</li>
                  <li>All bookings are final and non-transferable.</li>
                </ul>
              </div>
            </div>

            <div className="md:w-1/3 bg-gray-50 p-8">
              <div className="sticky top-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Booking Date</h2>

                  <Calendar
                    value={selectedDay}
                    onChange={setSelectedDay}
                    shouldHighlightWeekends
                    minimumDate={minDate}
                    calendarClassName="custom-calendar"
                    colorPrimary="#3B82F6"
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking Summary</h2>
                  <div className="text-center mb-6">
                    <h3 className="text-4xl font-bold text-Lighbg-LightdarkBlue mb-2">
                      {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
                    </h3>
                    <p className="text-gray-600">
                      {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
                    </p>
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>{property.lookingFor === 'rent' ? 'Deposit Amount:' : 'Booking Amount (5% capped):'}</span>
                      <strong>₹{depositAmount.toFixed(2)}</strong>
                    </p>
                    <p className="flex justify-between"><span>Fixed Booking Fee:</span> <strong>₹{fixedBookingFee.toFixed(2)}</strong></p>
                    <p className="flex justify-between text-lg font-bold"><span>Total Amount:</span> <strong>₹{totalAmount.toFixed(2)}</strong></p>
                  </div>
                  <button
                    onClick={handleBooking}
                    className="mt-8 w-full p-4 bg-LightdarkBlue text-white font-bold rounded-full"
                  >
  {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;


