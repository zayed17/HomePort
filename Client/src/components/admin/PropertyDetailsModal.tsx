import React, { useState } from 'react';
import { Modal, Button, Typography, Space, Input, Row, Col, notification } from 'antd';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoMdHome, IoMdBed, IoMdPin, IoMdCar, IoMdImages } from 'react-icons/io';
import { useVerifyPropertyMutation, useRejectPropertyMutation } from '../../store/property/propertyApi';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface PropertyDetailsModalProps {
  property: any;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [verifyProperty] = useVerifyPropertyMutation();
  const [rejectProperty] = useRejectPropertyMutation();

  if (!property) return null;

  const openNotification = (type: 'success' | 'error', message: string, description?: string) => {
    notification[type]({
      message,
      description,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleVerify = async () => {
    try {
      await verifyProperty(property._id).unwrap();
      openNotification('success', 'Property Verified', 'Property verified successfully');
      onClose();
    } catch (error) {
      openNotification('error', 'Verification Failed', 'Failed to verify the property');
    }
  };

  const handleReject = async () => {
    try {
      await rejectProperty({ propertyId: property._id, reason: rejectReason }).unwrap();
      openNotification('success', 'Property Rejected', 'Property rejected successfully');
      onClose();
    } catch (error) {
      openNotification('error', 'Rejection Failed', 'Failed to reject the property');
    }
  };

  return (
    <Modal
      visible={true}
      title={<Title level={4} className="text-xl">{property.propertyType}</Title>}
      onCancel={onClose}
      footer={[
        <Button key="verify" type="primary" onClick={handleVerify} icon={<FaCheckCircle />} className="bg-green-500 hover:bg-green-600">
          Verify
        </Button>,
        <Button key="reject" type="primary" onClick={() => setShowRejectReason(!showRejectReason)} icon={<FaTimesCircle />} className="bg-red-500 hover:bg-red-600">
          Reject
        </Button>,
      ]}
      width={800}
      className="property-details-modal ant-modal"
      bodyStyle={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }} 
    >
      <Title level={5} className="text-lg font-semibold">
        <IoMdHome className="inline-block mr-2 text-blue-500" />
        {property.propertyType}
      </Title>

      <div className="mb-4">
        <Title level={5} className="text-lg font-semibold">Description</Title>
        <Text>{property.description}</Text>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <InfoSection title="Location" icon={<IoMdPin className="text-blue-500" />}>
            <Text>Address: {property.address}</Text>
            <Text>City: {property.city}</Text>
          </InfoSection>
        </Col>

        {property.isForRent && (
          <Col span={12}>
            <InfoSection title="Rent Details" icon={<IoMdHome className="text-green-500" />}>
              <Text>Rent: ${property.rentAmount}</Text>
              <Text>Negotiable: {property.isNegotiable ? 'Yes' : 'No'}</Text>
              <Text>Bills Included: {property.areBillsIncluded ? 'Yes' : 'No'}</Text>
              <Text>Deposit: ${property.depositAmount}</Text>
            </InfoSection>
          </Col>
        )}

        {property.isForSale && (
          <Col span={12}>
            <InfoSection title="Sale Details" icon={<IoMdHome className="text-yellow-500" />}>
              <Text>Price: ${property.salePrice}</Text>
              <Text>Negotiable: {property.isPriceNegotiable ? 'Yes' : 'No'}</Text>
            </InfoSection>
          </Col>
        )}

        <Col span={12}>
          <InfoSection title="Property Details" icon={<IoMdHome className="text-gray-500" />}>
            <Text>Facing: {property.facing}</Text>
            <Text>Age: {property.propertyAge}</Text>
            <Text>Floors: {property.totalFloors}</Text>
            <Text>Area: {property.totalArea} sqft</Text>
            <Text>Furnishing: {property.furnisherType}</Text>
            <Text>Available From: {new Date(property.availableFrom).toLocaleDateString()}</Text>
          </InfoSection>
        </Col>

        <Col span={12}>
          <InfoSection title="Rooms" icon={<IoMdBed className="text-purple-500" />}>
            <Text>Bedrooms: {property.bedrooms}</Text>
            <Text>Bathrooms: {property.bathrooms}</Text>
            <Text>Balconies: {property.balconies}</Text>
            {property.otherRooms && (
              <div>
                <Text strong>Other Rooms:</Text>
                <ul>
                  {property.otherRooms.map((room: string, index: number) => (
                    <li key={index}>{room}</li>
                  ))}
                </ul>
              </div>
            )}
          </InfoSection>
        </Col>

        <Col span={12}>
          <InfoSection title="Features & Advantages" icon={<IoMdHome className="text-teal-500" />}>
            {property.propertyFeatures && (
              <div>
                <Text strong>Features:</Text>
                <ul>
                  {property.propertyFeatures.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {property.propertyAdvantages && (
              <div>
                <Text strong>Advantages:</Text>
                <ul>
                  {property.propertyAdvantages.map((advantage: string, index: number) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
            )}
          </InfoSection>
        </Col>

        <Col span={12}>
          <InfoSection title="Parking" icon={<IoMdCar className="text-orange-500" />}>
            <Text>Cars: {property.noOfCars}</Text>
            <Text>Scooters: {property.noOfScooters}</Text>
            <Text>Bikes: {property.noOfBikes}</Text>
          </InfoSection>
        </Col>
      </Row>

      <InfoSection title="Media" icon={<IoMdImages className="text-indigo-500" />}>
        <Row gutter={16}>
          {property.mediaFiles.map((file: string, index: number) => (
            <Col key={index} span={6}>
              <img
                src={file}
                alt={`Property ${index + 1}`}
                className="w-full h-36 object-cover rounded-lg"
              />
            </Col>
          ))}
        </Row>
      </InfoSection>

      <InfoSection title="Direction Tips" icon={<IoMdPin className="text-blue-500" />}>
        <Text>{property.directionTips}</Text>
      </InfoSection>

      {showRejectReason && (
        <div className="mt-4">
          <TextArea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
            placeholder="Reason for rejection"
            className="mb-2"
          />
          <Button
            type="primary"
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-600"
            icon={<FaTimesCircle />}
          >
            Submit Rejection
          </Button>
        </div>
      )}
    </Modal>
  );
};

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
    <Space>
      {icon && <span className="text-xl">{icon}</span>}
      <Title level={5} className="text-lg font-medium">{title}</Title>
    </Space>
    <div className="mt-2">{children}</div>
  </div>
);

export default PropertyDetailsModal;