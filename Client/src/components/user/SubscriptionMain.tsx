import React, { useEffect, useState } from 'react';
import { FaCheck, FaCrown, FaRocket, FaLeaf } from 'react-icons/fa';
import { useGetSubscriptionsQuery } from '../../store/admin/adminApi';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import loaderGif from '/assets/gifff.gif';
import { useGetUserQuery } from '../../store/user/userApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { message } from 'antd';


interface SubscriptionPlan {
  _id: string;
  type: string;
  price: number;
  durationInDays: number;
  features: string[];
  sponsoredPropertiesLimit: number;
  propertiesLimit: number;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const SubscriptionHero: React.FC = () => {
  const { data, error, isLoading } = useGetSubscriptionsQuery({});
  const { data: { userDetails } = {} } = useGetUserQuery({});
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [priceDifference, setPriceDifference] = useState<number | null>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load subscriptions');
    }
  }, [error]);

  useEffect(() => {
    if (data && Array.isArray(data.subscriptions)) {
      setSubscriptions(data.subscriptions);
    } else {
      setSubscriptions([]);
    }
  }, [data]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      toast.success('Subscription added successfully');
    }
  }, []);

  const calculatePriceDifference = (newPlanCost: number) => {
    if (!userDetails?.subscriptionId) return newPlanCost;

    const currentPlanCost = userDetails.subscriptionId.price;
    const startDate = dayjs(userDetails.subscriptionId.startDate);
    const endDate = dayjs(userDetails.subscriptionId.endDate);
    const totalDays = endDate.diff(startDate, 'day');
    const daysUsed = dayjs().diff(startDate, 'day');
    const remainingValue = ((totalDays - daysUsed) / totalDays) * currentPlanCost;

    const priceDifference = newPlanCost - remainingValue;
    return priceDifference > 0 ? priceDifference : 0;
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) { 
      message.warning('Please log in to add a subscription.');
      return;
    }
    const difference = calculatePriceDifference(plan.price);
    setPriceDifference(difference);
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmSubscription = async () => {
    if (!selectedPlan) return;

    setProcessing(true);

    try {
      // const { data: { id: sessionId } } = await axios.post('http://localhost/api/subscriptions/payment-intent', {
      const { data: { id: sessionId } } = await axios.post('https://api.homeport.online/api/subscriptions/payment-intent', {
        amount: priceDifference! * 100,
        planId: selectedPlan._id,
        subscriptionType: selectedPlan.type,
        durationInDays: selectedPlan.durationInDays,
        propertyLimit: selectedPlan.propertiesLimit,
        sponsoredLimit: selectedPlan.sponsoredPropertiesLimit,
      }, {
        withCredentials: true,
      });

      const stripe = await stripePromise;
      const { error }:any = await stripe?.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Payment failed', error);
        toast.error('Payment failed');
      } else {
        toast.success('Redirecting to payment gateway...');
      }

    } catch (error) {
      console.error('Subscription failed', error);
      toast.error('Subscription failed');
    } finally {
      setProcessing(false);
      setShowModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (!subscriptions.length) {
    return <p className="text-center text-lg text-red-600">No subscriptions available.</p>;
  }

  const getPlanIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'basic': return <FaLeaf className="text-green-500 text-4xl mb-4" />;
      case 'standard': return <FaRocket className="text-blue-500 text-4xl mb-4" />;
      case 'premium': return <FaCrown className="text-yellow-500 text-4xl mb-4" />;
      default: return null;
    }
  };

  const getPlanColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'basic': return 'from-green-400 to-green-600';
      case 'standard': return 'from-blue-400 to-blue-600';
      case 'premium': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const renderButton = (plan: SubscriptionPlan) => {
    if (userDetails?.subscriptionId) {
      const currentPlan = userDetails.subscriptionId.type.toLowerCase();
      const planType = plan.type.toLowerCase();

      if (currentPlan === 'basic' && planType === 'basic') {
        return <button disabled className="w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gray-400">Current Plan</button>;
      }

      if (currentPlan === 'basic' && (planType === 'standard' || planType === 'premium')) {
        return <button onClick={() => handleSubscribe(plan)} className={`w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gradient-to-r ${getPlanColor(plan.type)} hover:opacity-90`}>Upgrade to {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}</button>;
      }

      if (currentPlan === 'standard' && planType === 'basic') {
        return <button disabled className="w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gray-400">Downgrade Not Allowed</button>;
      }

      if (currentPlan === 'standard' && planType === 'standard') {
        return <button disabled className="w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gray-400">Current Plan</button>;
      }

      if (currentPlan === 'standard' && planType === 'premium') {
        return <button onClick={() => handleSubscribe(plan)} className={`w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gradient-to-r ${getPlanColor(plan.type)} hover:opacity-90`}>Upgrade to Premium</button>;
      }

      if (currentPlan === 'premium') {
        return <button disabled className="w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gray-400">Current Plan</button>;
      }
    } else {
      return <button onClick={() => handleSubscribe(plan)} className={`w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gradient-to-r ${getPlanColor(plan.type)} hover:opacity-90`}>Get Started</button>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Unlock Your Real Estate Potential</h1>
      <p className="text-center text-xl mb-12 text-gray-600">Choose the plan that suits your ambitions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subscriptions.map((plan) => (
          <div
            key={plan._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className={`p-6 text-white bg-gradient-to-br ${getPlanColor(plan.type)}`}>
              <div className="text-center">
                {getPlanIcon(plan.type)}
                <h2 className="text-3xl font-bold mb-2 capitalize">{plan.type}</h2>
                <p className="text-4xl font-extrabold">₹{plan.price.toLocaleString('en-IN')}</p>
                <p className="text-sm opacity-75">for {plan.durationInDays} days</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <ul className="mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {renderButton(plan)}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Confirm Subscription</h3>
            <p className="mb-6 text-gray-600">You are about to subscribe to the <strong>{selectedPlan.type}</strong> plan.</p>
            {priceDifference !== null && (
              <p className="text-lg font-bold mb-6">Amount to be paid: ₹{priceDifference.toLocaleString('en-IN')}</p>
            )}
            <div className="flex justify-between items-center mb-4">
              {/* <label className="text-gray-600 font-medium">Auto Renew</label> */}
              {/* <input
                type="checkbox"
                checked={autoRenew}
                onChange={() => setAutoRenew(!autoRenew)}
                className="w-6 h-6 text-blue-600 border-gray-300 rounded"
              /> */}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-bold mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubscription}
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-bold"
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionHero;