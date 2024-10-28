import { Layout, Card, Statistic, Row, Col, Table, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import 'antd/dist/reset.css'; 
import { useGetDashboardQuery } from '../../store/property/propertyApi';
import moment from 'moment';
import Loader from '../common/Loader';

const { Content } = Layout;
const { Title } = Typography;

const sortByMonth = (data: any) => {
  return data.sort((a:any, b:any) => {
    const dateA = moment(a.month, 'MMM YYYY');
    const dateB = moment(b.month, 'MMM YYYY');
    return dateA.isBefore(dateB) ? -1 : 1;
  });
};

const sortRevenueByMonth = (data: any) => {
  return data.sort((a:any, b:any) => {
    const dateA = moment(a.month, 'MMM YYYY');
    const dateB = moment(b.month, 'MMM YYYY');
    return dateA.isBefore(dateB) ? -1 : 1;
  });
};

const DashboardMain = () => {
  const { data, error, isLoading } = useGetDashboardQuery({});

  if (isLoading || error) {
    return <Loader />;
  }
  

  const bookingData = Object.entries(data?.bookingsByMonth || {}).map(([month, bookings]) => ({
    month,
    bookings
  }));

  const revenueByMonth = Object.entries(data?.revenueByMonth || {}).map(([month, revenue]) => ({
    month,
    revenue
  }));

  const sortedBookingData = sortByMonth(bookingData);
  const sortedRevenueByMonth = sortRevenueByMonth(revenueByMonth);
  const totalRevenue: any = Object.values(data?.revenueByMonth || {}).reduce(
    (acc, revenue) => (acc as number) + (revenue as number),
    0
  );
  const properties = data?.properties || [];
  const bookedProperties = properties.filter((property:any) => property.status === 'booked');
  const noOfSellBooked = bookedProperties.filter((property:any) => property.lookingFor === 'sell');
  const noOfRentBooked = bookedProperties.filter((property:any) => property.lookingFor === 'rent');

  const columns = [
    { 
      title: 'Booked Date', 
      dataIndex: 'updatedAt', 
      key: 'date',
      render: (text: string) => moment(text).format('YYYY-MM-DD')  
    },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Property Type', dataIndex: 'propertyType', key: 'property' },
    { title: 'For', dataIndex: 'lookingFor', key: 'amount' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'Completed' ? 'green' : 'orange' }}>
          {status}
        </span>
      )
    },
  ];

  const propertyTypeCount = properties.reduce((acc:any, property:any) => {
    if (!acc[property.propertyType]) {
      acc[property.propertyType] = 0;
    }
    acc[property.propertyType]++;
    return acc;
  }, {} as Record<string, number>);

  const propertyTypeData = Object.entries(propertyTypeCount).map(([type, count]) => ({
    name: type,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Content style={{ padding: '24px', minHeight: '100vh' }}>
      <Title level={2}>Dashboard Overview</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Total Properties" 
              value={properties.length} 
              prefix={<ArrowUpOutlined />} 
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Properties Sold" 
              value={noOfSellBooked.length} 
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Properties Rented" 
              value={noOfRentBooked.length} 
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Total Revenue" 
              value={totalRevenue} 
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Booking Trends" hoverable>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedBookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Revenue Overview" hoverable>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sortedRevenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#722ed1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12}>
          <Card title="Property Types" hoverable>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Booked Properties" hoverable>
            <Table columns={columns} dataSource={bookedProperties} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default DashboardMain;