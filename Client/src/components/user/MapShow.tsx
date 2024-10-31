import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Tooltip, Card, Typography, Space, Tag } from 'antd';
import { HomeFilled, DollarCircleFilled, BankFilled } from '@ant-design/icons';
import { FaHome } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

const { Text, Title } = Typography;

const MAPBOX_TOKEN = 'pk.eyJ1IjoiemF5ZWQxNyIsImEiOiJjbHpqbnl5d3YwdHJsMmpzaXRkcHc1NW55In0.C91Rt8F6i6zkC2mHGqubcg';

interface Property {
  _id: string;
  latitude: number;
  longitude: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  description: string;
  mediaFiles: string[];
  [key: string]: any;
}

const MapWithProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewport, setViewport] = useState({
    latitude: 10.0165,
    longitude: 76.2673,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://api.homeport.online/api/property/list-properties-map');
        // const response = await fetch('http://localhost:5003/api/property/list-properties-map');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Property[] = await response.json();
        console.log(data,"chdkeicsd")
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleTooltipClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <Card
      className="shadow-lg"
      style={{ width: 300 }}
      cover={
        property.mediaFiles.length > 0 && (
          <img
            alt="Property"
            src={property.mediaFiles[0]}
            className="object-cover h-40 w-full rounded-t-lg"
          />
        )
      }
    >
      <Space direction="vertical" size="small">
        <Title level={5} className="text-xl font-semibold">{property.address}</Title>
        <Space>
          <Tag icon={<HomeFilled />} color="blue" className="bg-blue-100 text-blue-800">{property.bedrooms} BR</Tag>
          <Tag icon={<BankFilled />} color="green" className="bg-green-100 text-green-800">{property.bathrooms} BA</Tag>
          <Tag icon={<DollarCircleFilled />} color="gold" className="bg-yellow-100 text-yellow-800">₹{property.rentAmount}</Tag>
        </Space>
        <Text type="secondary" className="text-sm">{property.description}</Text>
      </Space>
    </Card>
  );

  return (
    <div className="relative w-full h-screen bg-gray-100 p-4">
      <ReactMapGL
        {...viewport}
        style={{
          width: '100%',
          height: '100%'
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        // className="rounded-lg shadow-lg"
      >
        {properties.map((property) => (
          !isNaN(property.latitude) && !isNaN(property.longitude) && (
            <Marker
              key={property._id}
              latitude={property.latitude}
              longitude={property.longitude}
            >
              <Tooltip
                title={<div onClick={() => handleTooltipClick(property._id)}><PropertyCard property={property} /></div>}
                color="white"
                overlayInnerStyle={{ padding: 0 }}
              >
                <div
                  className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white cursor-pointer shadow-md flex items-center justify-center"
                >
                  <FaHome color="white" />
                </div>
              </Tooltip>
            </Marker>
          )
        ))}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
};

export default MapWithProperties;