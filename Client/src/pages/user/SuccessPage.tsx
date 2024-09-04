import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [_hasProcessed, setHasProcessed] = useState(false);
  const hasFetchedRef = useRef(false);

  // Helper function to parse URL parameters
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      sessionId: searchParams.get('session_id'),
      propertyId: searchParams.get('property_id'),
      bookingDate: searchParams.get('booking_date'),
    };
  };

  useEffect(() => {
    const { sessionId, propertyId, bookingDate } :any= getQueryParams();

    if (sessionId && !hasFetchedRef.current) {
      // To prevent duplicate API calls
      hasFetchedRef.current = true;

      // Fetch the payment details using the session ID
      axios
        .get(`/api/payment-details?session_id=${sessionId}`)
        .then((response) => {
          setPaymentDetails({
            ...response.data,
            propertyId,
            bookingDate: decodeURIComponent(bookingDate),
          });
          setHasProcessed(true);
        })
        .catch((error) => {
          console.error('Error fetching payment details:', error);
        });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-lg text-center">
        {/* Cartoon House Image */}
        <img
          src="https://png.pngtree.com/png-clipart/20221219/original/pngtree-cartoon-house-illustration-png-image_8780795.png"
          alt="Cartoon House"
          className="w-24 h-24 mx-auto mb-6 animate-bounce"
        />
        <h1 className="text-4xl font-extrabold mb-4 text-green-600">Payment Successful!</h1>
        <p className="text-lg mb-6 text-gray-700">Thank you for sponsoring your property.</p>
        {paymentDetails && (
          <div className="space-y-4 text-gray-800 text-left bg-gray-50 p-4 rounded-md shadow-inner">
            <p><strong>Property ID:</strong> {paymentDetails.propertyId}</p>
            <p><strong>Booking Date:</strong> {paymentDetails.bookingDate}</p>
            <p><strong>Amount Paid:</strong> ₹{paymentDetails.amount}</p>
            <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
          </div>
        )}
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;