import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Typography, Space, Tag, Spin, Alert } from 'antd';
import { useGetAdminPropertiesQuery, useBlockAndUnblockMutation } from '../../store/propertyApi';

const { Title } = Typography;

interface Property {
  _id: string;
  propertyType: string;
  address: string;
  lookingFor: string;
  totalArea: number;
  rentAmount: number;
  sellPrice?: number;
  status: string;
  eligibility: string;
  isBlock: boolean;
  noOfReports: number; 
}

const PropertyList: React.FC = () => {
  const [blockUnblock] = useBlockAndUnblockMutation();
  const { data: properties = [], error, isLoading, refetch } = useGetAdminPropertiesQuery({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [viewType, setViewType] = useState<'rent' | 'sell'>('rent');

  useEffect(() => {
    if (properties) {
      setFilteredProperties(properties);
    }
  }, [properties]);

  useEffect(() => {
    setFilteredProperties(
      properties.filter((property:any) =>
        property.lookingFor === viewType &&
        (property.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.totalArea.toString().includes(searchTerm) ||
          (property.rentAmount && property.rentAmount.toString().includes(searchTerm)) ||
          (property.sellPrice && property.sellPrice.toString().includes(searchTerm)))
      )
    );
  }, [searchTerm, properties, viewType]);

  const handleBlockUnblock = async (propertyId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await blockUnblock({ _id: propertyId, newStatus });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: viewType === 'rent' ? 'Rent Amount' : 'Sell Price',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: any, record: Property) => viewType === 'rent' ? record.rentAmount : record.sellPrice,
    },
    {
      title: 'Area',
      dataIndex: 'totalArea',
      key: 'totalArea',
      render: (text: any) => `${text} sq ft`,
    },
    {
      title: 'Eligibility',
      dataIndex: 'eligibility',
      key: 'eligibility',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'No. of Reports',
      dataIndex: 'noOfReports',
      key: 'noOfReports',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Property) => (
        <Space size="middle">
          <Button
            type={record.isBlock ? 'default' : 'primary'}
            danger={record.isBlock}
            onClick={() => handleBlockUnblock(record._id, record.isBlock)}
          >
            {record.isBlock ? 'Unblock' : 'Block'}
          </Button>
        </Space>
      ),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return 'blue';
      default:
        return 'default';
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-full"><Spin tip="Loading..." /></div>;
  if (error) return <div className="container mx-auto px-4 py-8"><Alert message="Error" description="Failed to load properties" type="error" /></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">Property List</Title>

      <div className="flex justify-between mb-4">
        <div>
          <Button
            type={viewType === 'rent' ? 'primary' : 'default'}
            onClick={() => setViewType('rent')}
            className="mr-2"
          >
            Rent
          </Button>
          <Button
            type={viewType === 'sell' ? 'primary' : 'default'}
            onClick={() => setViewType('sell')}
          >
            Sell
          </Button>
        </div>

        <Input
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredProperties.map((property, index) => ({ ...property, key: property._id, index }))}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />
    </div>
  );
};

export default PropertyList;