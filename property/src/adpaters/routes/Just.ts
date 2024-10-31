import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checking = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    console.log(id,"id checking from front end")
    const response = await axios.get(`https://api.homeport.online/api/user/details/${id}`);
console.log(response,"response checking form backend")
    if (!response.data) {
      return res.status(400).json({ message: 'Invalid user data received.' });
    }

    const { postedProperty,  sponsoredPosted } = response.data;


    if(!response.data.subscriptionId){
      if(postedProperty>=1){
        return res.status(403).json({ message: 'Your Limit is Over. Purchase Subscription' });
      }else if(sponsoredPosted >=1){
        return res.status(403).json({ message: 'Your Limit is Over. Purchase Subscription'})
      }
      return next()
    }


    const {  propertyLimit,  sponsoredLimit } = response.data.subscriptionId;

    if (postedProperty >= propertyLimit) {
      return res.status(403).json({ message: 'Property posting limit reached for your subscription plan.' });
    }

    if (sponsoredPosted >= sponsoredLimit) {
      return res.status(403).json({ message: 'Sponsored property posting limit reached for your subscription plan.' });
    }

    next();
  } catch (error) {
    console.error('Subscription check failed:', error);
    res.status(500).json({ message: 'Internal server error occurred while checking subscription limits.' });
  }
};