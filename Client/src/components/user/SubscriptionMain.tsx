import React, { useEffect, useState } from 'react';
import { FaCheck, FaCrown, FaRocket, FaLeaf } from 'react-icons/fa';
import { useGetSubscriptionsQuery } from '../../store/admin/adminApi';
import toast from 'react-hot-toast';

interface SubscriptionPlan {
  _id: string;
  type: string;
  price: number;
  durationInDays: number;
  features: string[];
}

const SubscriptionHero: React.FC = () => {
  const { data, error, isLoading } = useGetSubscriptionsQuery();
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);

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

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      // Assuming the subscription mutation will be implemented
      // await subscribe({ planId: plan._id }).unwrap();
      toast.success(`Subscription to ${plan.type} successful`);
    } catch (err) {
      toast.error('Subscription failed');
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div></div>;

  if (!subscriptions.length) return <p className="text-center text-lg text-red-600">No subscriptions available.</p>;

  const getPlanIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'basic': return <FaLeaf className="text-green-500 text-4xl mb-4" />;
      case 'standard': return <FaRocket className="text-blue-500 text-4xl mb-4" />;
      case 'premium': return <FaCrown className="text-yellow-500 text-4xl mb-4" />;
      default: return null;
    }
  };

  const getPlanColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'basic': return 'from-green-400 to-green-600';
      case 'standard': return 'from-blue-400 to-blue-600';
      case 'premium': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
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
            className="bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className={`p-6 text-white bg-gradient-to-br ${getPlanColor(plan.type)}`}>
              <div className="text-center">
                {getPlanIcon(plan.type)}
                <h2 className="text-3xl font-bold mb-2">{plan.type}</h2>
                <p className="text-4xl font-extrabold">₹{plan.price}</p>
                <p className="text-sm opacity-75">for {plan.durationInDays} days</p>
              </div>
            </div>
            <div className="p-6">
              <ul className="text-gray-600 space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 mr-3" /> {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gradient-to-r ${getPlanColor(plan.type)} hover:opacity-90`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionHero;