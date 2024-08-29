import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { useCreatePaymentIntentMutation } from '../../store/property/propertyApi';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!); 

const SponsoredMain = () => {
  const [makePayment] = useCreatePaymentIntentMutation()
  const { id } = useParams<{ id: string }>();
  console.log(id,"chickdf")
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [cost, setCost] = useState<number>(5000);
  const [loading, setLoading] = useState(false);

  const handleDaysChange = (days: number) => {
    setSelectedDays(days);
    setCost(days * 150);
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const { id: sessionId } = await makePayment({ amount: cost * 100, propertyId: id }).unwrap();

      const stripe = await stripePromise;
      const { error  } = await stripe?.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Payment failed', error);
      }
    } catch (error:any) {
      toast.error(error.data.message);
      console.error('Payment failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
      }}
    >
      <div className="container max-w-4xl mx-auto p-10 space-y-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">Sponsor Your Property</h1>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Property ID: {id}</h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg transition-transform transform hover:scale-102">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaInfoCircle className="mr-2 text-blue-500 text-2xl" />
              Why Sponsor Your Property?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Increase your property's visibility by sponsoring it, placing it at the top of listings. This helps attract more potential buyers or renters and highlights your property with a special badge.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg transition-transform transform hover:scale-102">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaCheckCircle className="mr-2 text-blue-500 text-2xl" />
              Select Sponsorship Duration
            </h3>
            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <label className="block text-gray-600 mb-2">Days:</label>
                <select
                  value={selectedDays}
                  onChange={(e) => handleDaysChange(Number(e.target.value))}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value={15}>15 Days</option>
                  <option value={30}>30 Days</option>
                  <option value={45}>45 Days</option>
                  <option value={60}>60 Days</option>
                </select>
              </div>
              <div className="w-1/2 text-right">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Total Cost:</h4>
                <p className="text-4xl font-bold text-blue-600">₹{cost.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg transition-transform transform hover:scale-102">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaInfoCircle className="mr-2 text-blue-500 text-2xl" />
              Terms & Conditions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              By sponsoring your property, you agree to the following terms and conditions: <br />
              1. The sponsorship is valid for the selected duration from the date of purchase. <br />
              2. Sponsored properties are subject to review and may be removed if they violate our listing guidelines. <br />
              3. The sponsorship fee is non-refundable.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors text-lg font-semibold transform hover:scale-102"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm & Sponsor'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsoredMain;