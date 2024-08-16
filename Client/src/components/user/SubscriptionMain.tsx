// import React, { useEffect, useState } from 'react';
// import { FaCheck, FaCrown, FaRocket, FaLeaf, FaTimes } from 'react-icons/fa';
// import { useGetSubscriptionsQuery } from '../../store/admin/adminApi';
// import toast from 'react-hot-toast';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';

// interface SubscriptionPlan {
//   _id: string;
//   type: string;
//   price: number;
//   durationInDays: number;
//   features: string[];
//   sponsoredPropertiesLimit:number;
//   propertiesLimit:number
// }

// const stripePromise = loadStripe('pk_test_51Pkesm094jYnWAeuuyD2MBhHKbpxz6YKkdPIcN3EE9WcXBDYrRlht9fkrVlgUdyBfAG81e9ljwp9gKhwqyUWl7UN00zLEfOptE'); // Replace with your publishable key

// const SubscriptionHero: React.FC = () => {
//   const { data, error, isLoading } = useGetSubscriptionsQuery();
//   const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
//   const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [autoRenew, setAutoRenew] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     if (error) {
//       toast.error('Failed to load subscriptions');
//     }
//   }, [error]);

//   useEffect(() => {
//     if (data && Array.isArray(data.subscriptions)) {
//       setSubscriptions(data.subscriptions);
//     } else {
//       setSubscriptions([]);
//     }
//   }, [data]);

//   const handleSubscribe = (plan: SubscriptionPlan) => {
//     setSelectedPlan(plan);
//     setShowModal(true);
//   };


//   const confirmSubscription = async () => {
//     if (!selectedPlan) return;

//     setProcessing(true);

//     try {
//       const { data: { id: sessionId } } = await axios.post('http://localhost:5002/subscriptions/payment-intent', {
//         amount: selectedPlan.price * 100, 
//         planId: selectedPlan._id,
//         subscriptionType: selectedPlan.type,
//         durationInDays: selectedPlan.durationInDays,
//         autoRenew,
//         propertyLimit:selectedPlan.propertiesLimit,
//         sponsoredLimit:selectedPlan.sponsoredPropertiesLimit
//       },{
//         withCredentials: true,
//       });

//       const stripe = await stripePromise;
//       const { error } = await stripe?.redirectToCheckout({ sessionId });

//       if (error) {
//         console.error('Payment failed', error);
//         toast.error('Payment failed');
//       } else {
//         toast.success('Redirecting to payment gateway...');
//       }

//     } catch (error) {
//       console.error('Subscription failed', error);
//       toast.error('Subscription failed');
//     } finally {
//       setProcessing(false);
//       setShowModal(false);
//     }
//   };


//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   if (!subscriptions.length) {
//     return <p className="text-center text-lg text-red-600">No subscriptions available.</p>;
//   }

//   const getPlanIcon = (type: string) => {
//     switch (type.toLowerCase()) {
//       case 'basic': return <FaLeaf className="text-green-500 text-4xl mb-4" />;
//       case 'standard': return <FaRocket className="text-blue-500 text-4xl mb-4" />;
//       case 'premium': return <FaCrown className="text-yellow-500 text-4xl mb-4" />;
//       default: return null;
//     }
//   };

//   const getPlanColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case 'basic': return 'from-green-400 to-green-600';
//       case 'standard': return 'from-blue-400 to-blue-600';
//       case 'premium': return 'from-yellow-400 to-yellow-600';
//       default: return 'from-gray-400 to-gray-600';
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Unlock Your Real Estate Potential</h1>
//       <p className="text-center text-xl mb-12 text-gray-600">Choose the plan that suits your ambitions</p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {subscriptions.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//           >
//             <div className={`p-6 text-white bg-gradient-to-br ${getPlanColor(plan.type)}`}>
//               <div className="text-center">
//                 {getPlanIcon(plan.type)}
//                 <h2 className="text-3xl font-bold mb-2 capitalize">{plan.type}</h2>
//                 <p className="text-4xl font-extrabold">₹{plan.price.toLocaleString('en-IN')}</p>
//                 <p className="text-sm opacity-75">for {plan.durationInDays} days</p>
//               </div>
//             </div>
//             <div className="p-6">
//               <ul className="text-gray-600 space-y-4 mb-8">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center">
//                     <FaCheck className="text-green-500 mr-3" /> {feature}
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 onClick={() => handleSubscribe(plan)}
//                 className={`w-full py-3 rounded-full text-white font-bold text-lg transition duration-300 bg-gradient-to-r ${getPlanColor(plan.type)} hover:opacity-90`}
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && selectedPlan && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               <FaTimes size={24} />
//             </button>
//             <h2 className="text-2xl font-bold mb-4">Confirm Your Subscription</h2>
//             <p className="mb-4">You've selected the <strong>{selectedPlan.type}</strong> plan.</p>
//             <ul className="mb-6">
//               <li>Price: ₹{selectedPlan.price.toLocaleString('en-IN')}</li>
//               <li>Duration: {selectedPlan.durationInDays} days</li>
//             </ul>
//             <div className="mb-6">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={autoRenew}
//                   onChange={() => setAutoRenew(!autoRenew)}
//                   className="mr-2"
//                 />
//                 Enable Auto-Renewal
//               </label>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmSubscription}
//                 className={`px-4 py-2 rounded text-white font-bold bg-gradient-to-r ${getPlanColor(selectedPlan.type)} ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={processing}
//               >
//                 {processing ? 'Processing...' : 'Confirm Subscription'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionHero;



import React, { useEffect, useState } from 'react';
import { FaCheck, FaCrown, FaRocket, FaLeaf, FaTimes } from 'react-icons/fa';
import { useGetSubscriptionsQuery } from '../../store/admin/adminApi';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

interface SubscriptionPlan {
  _id: string;
  type: string;
  price: number;
  durationInDays: number;
  features: string[];
  sponsoredPropertiesLimit: number;
  propertiesLimit: number;
}

const stripePromise = loadStripe('pk_test_51Pkesm094jYnWAeuuyD2MBhHKbpxz6YKkdPIcN3EE9WcXBDYrRlht9fkrVlgUdyBfAG81e9ljwp9gKhwqyUWl7UN00zLEfOptE'); // Replace with your publishable key

const SubscriptionHero: React.FC = () => {
  const { data, error, isLoading } = useGetSubscriptionsQuery();
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [processing, setProcessing] = useState(false);

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

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmSubscription = async () => {
    if (!selectedPlan) return;

    setProcessing(true);

    try {
      const { data: { id: sessionId } } = await axios.post('http://localhost:5002/subscriptions/payment-intent', {
        amount: selectedPlan.price * 100, 
        planId: selectedPlan._id,
        subscriptionType: selectedPlan.type,
        durationInDays: selectedPlan.durationInDays,
        autoRenew,
        propertyLimit: selectedPlan.propertiesLimit,
        sponsoredLimit: selectedPlan.sponsoredPropertiesLimit,
      },{
        withCredentials: true,
      });

      const stripe = await stripePromise;
      const { error } = await stripe?.redirectToCheckout({ sessionId });

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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
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

      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Confirm Your Subscription</h2>
            <p className="mb-4">You've selected the <strong>{selectedPlan.type}</strong> plan.</p>
            <ul className="mb-6">
              <li>Price: ₹{selectedPlan.price.toLocaleString('en-IN')}</li>
              <li>Duration: {selectedPlan.durationInDays} days</li>
            </ul>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={() => setAutoRenew(!autoRenew)}
                  className="mr-2"
                />
                Enable Auto-Renewal
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubscription}
                className={`px-4 py-2 rounded text-white font-bold bg-gradient-to-r ${getPlanColor(selectedPlan.type)} ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionHero;