// src/pages/PaymentSuccess.jsx
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const hasFetchedRef = useRef(false); 

  useEffect(() => {
    if (!hasProcessed ) {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('session_id');
      const propertyId = queryParams.get('property_id');

      if (sessionId && propertyId && !hasFetchedRef.current) {
        hasFetchedRef.current = true;
        axios.post('http://localhost:5003/property/payment-success', {
          sessionId,
          propertyId,
        })
        .then(response => {
          setPaymentDetails(response.data);
          setHasProcessed(true); 
        })
        .catch(error => {
          console.error('Payment success handling failed', error);
        });
      }
    }
  }, [location.search, hasProcessed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for sponsoring your property.</p>
        {paymentDetails && (
          <div className="space-y-4 text-black">
            <p><strong>Property ID:</strong> {paymentDetails.propertyId}</p>
            <p><strong>Amount Paid:</strong> ₹{paymentDetails.amount}</p>
            <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
          </div>
        )}
        <button onClick={() => navigate('/')} className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;