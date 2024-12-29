import  { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Result, Button, Card, Spin, Typography, Space } from 'antd';
import { SmileOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    const { sessionId, propertyId, bookingDate }:any = getQueryParams();

    if (sessionId && !hasFetchedRef.current) {

      hasFetchedRef.current = true;
      setLoading(true);


      axios
        .get(`/api/payment-details?session_id=${sessionId}`)
        .then((response) => {
          setPaymentDetails({
            ...response.data,
            propertyId,
            bookingDate: decodeURIComponent(bookingDate),
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching payment details:', error);
          setLoading(false);
        });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {loading ? (
        <Spin size="large" tip="Fetching Payment Details..." />
      ) : (
        <Card
          style={{ maxWidth: 600, borderRadius: 10 }}
          cover={
            <Result
              icon={<SmileOutlined style={{ color: '#52c41a' }} />}
              status="success"
              title="Payment Successful!"
              subTitle="Thank you for sponsoring your property."
            />
          }
        >
          {paymentDetails && (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card style={{ borderRadius: 8, background: '#fafafa' }}>
                <Title level={4}>Payment Details</Title>
                <div style={{ paddingLeft: 16 }}>
                  <Text strong>Property ID: </Text>
                  <Text>{paymentDetails.propertyId}</Text>
                  <br />
                  <Text strong>Booking Date: </Text>
                  <Text>{paymentDetails.bookingDate}</Text>
                  <br />
                  <Text strong>Amount Paid: </Text>
                  <Text>₹{paymentDetails.amount}</Text>
                  <br />
                  <Text strong>Transaction ID: </Text>
                  <Text>{paymentDetails.transactionId}</Text>
                </div>
              </Card>

              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                block
                onClick={() => navigate('/')}
                style={{ borderRadius: 8 }}
              >
                Go to Dashboard
              </Button>
            </Space>
          )}
        </Card>
      )}
    </div>
  );
};

export default PaymentSuccess;
