import { useState } from 'react';
import { Modal, Button, Form, Input, Rate, message,notification } from 'antd';
import * as turf from '@turf/turf';
import ReviewList from './ReviewList';
import { useAddReviewMutation } from '../../store/property/propertyApi';

const AddReview = ({propertyId,reviews,refetch}:any) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [_, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [addReview] = useAddReviewMutation()
  const [form] = Form.useForm();

  const propertyCoords: [number, number] = [75.8573407, 11.1878875];

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude,"check")
        setUserLocation([longitude, latitude]);
        checkProximity([longitude, latitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching location:', error.message);
        alert('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  const checkProximity = (userCoords: [number, number]) => {
    const from = turf.point(userCoords);
    const to = turf.point(propertyCoords);
    const options = { units: 'kilometers' };
    const distance = turf.distance(from, to, options as any);
console.log(distance,"checking")
    if (distance <= 6) {
      notification.success({
        message: 'You’re in the Zone!',
        description: 'You’re within 5 km of the property. You can now add your review and share your experience.',
        placement: 'topRight',
        duration: 3,
      });
      setIsLocationModalOpen(false);
      setIsReviewModalOpen(true);
    } else {
      notification.error({
        message: 'Oops! Too Far! ',
        description: 'You’re too far from the property to add a review. Please get closer to the property and try again.',
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  const handleReviewSubmit = async (values: { rating: number; description: string }) => {
    setLoading(true);
    try {
      await addReview({rating: values.rating,description: values.description, propertyId}).unwrap();
      message.success('Review added successfully!');
      setIsReviewModalOpen(false);
      refetch()
      form.resetFields();
    } catch (error) {
      console.error('Error submitting review:', error);
      message.error('Failed to submit the review. Please try again.');
    }finally{
      setLoading(true)
    }
  };

  return (
    <div >
      <Modal title="Allow Location Access"
        open={isLocationModalOpen}
        onCancel={() => setIsLocationModalOpen(false)}
        footer={[
          <Button key="cancel"
            onClick={() => setIsLocationModalOpen(false)}
            className="text-gray-600 border-gray-300" >
            Cancel
          </Button>,
          <Button  key="confirm" loading={loading} onClick={getLocation}
            className="bg-DarkBlue text-white">
            Allow Location
          </Button>,
        ]}>
        <p className="text-gray-700">
          To add a review for this property, we need to access your current location to confirm you're within 4 km of
          it. Please allow location access.
        </p>
      </Modal>


      <Modal title="Add a Review" open={isReviewModalOpen} onCancel={() => setIsReviewModalOpen(false)} footer={null}
        className="custom-modal">
        <Form form={form} layout="vertical" onFinish={handleReviewSubmit} className="space-y-4">
          <Form.Item name="rating"label="Star Rating"
            rules={[{ required: true, message: 'Please provide a star rating!' }]}>
            <Rate className="text-yellow-500" />
          </Form.Item>

          <Form.Item name="description" label="Review Description"
            rules={[{ required: true, message: 'Please provide a description!' }]} >
            <Input.TextArea rows={4}placeholder="Write your review here..."className="rounded-md"/>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" loading={loading} className="bg-DarkBlue text-white w-full">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ReviewList setIsLocationModalOpen={setIsLocationModalOpen} reviews={reviews}/>
    </div>
  );
};

export default AddReview;
