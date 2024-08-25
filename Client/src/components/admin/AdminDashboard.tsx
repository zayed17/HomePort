import React from 'react';
import { Layout, Card, Statistic, Row, Col, Divider, List, Avatar, Tooltip } from 'antd';
import { HomeOutlined, UserOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line} from 'recharts';
import { useGetAdminPropertiesQuery } from '../../store/propertyApi';
import { useFindAllUsersQuery } from '../../store/user/userApi';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
  const { data: property = [], error, isLoading, refetch } = useGetAdminPropertiesQuery({});
  const { data: users = []} = useFindAllUsersQuery({});
  const noOfSubcription = users.filter((user:any)=>user.subscriptionId)
  
  const dummyData = {
    properties: Array.from({ length: 120 }, (_, i) => ({
      id: i + 1,
      name: `Property ${i + 1}`,
    })),
    users: Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
    })),
    subscriptions: [
      { name: 'Basic', value: 40 },
      { name: 'Standard', value: 35 },
      { name: 'Premium', value: 25 },
    ],
    totalRevenueFromSale: 125000,
    monthlyRevenue: [
      { month: 'Jan', revenue: 10000 },
      { month: 'Feb', revenue: 12000 },
      { month: 'Mar', revenue: 15000 },
      { month: 'Apr', revenue: 8000 },
      { month: 'May', revenue: 16000 },
      { month: 'Jun', revenue: 14000 },
      { month: 'Jul', revenue: 9000 },
      { month: 'Aug', revenue: 11000 },
      { month: 'Sep', revenue: 17000 },
      { month: 'Oct', revenue: 18000 },
      { month: 'Nov', revenue: 14000 },
      { month: 'Dec', revenue: 20000 },
    ],
    userGrowth: [
      { month: 'Jan', users: 100 },
      { month: 'Feb', users: 120 },
      { month: 'Mar', users: 140 },
      { month: 'Apr', users: 160 },
      { month: 'May', users: 180 },
      { month: 'Jun', users: 200 },
      { month: 'Jul', users: 220 },
      { month: 'Aug', users: 240 },
      { month: 'Sep', users: 260 },
      { month: 'Oct', users: 280 },
      { month: 'Nov', users: 300 },
      { month: 'Dec', users: 320 },
    ],
    recentActivities: [
      { id: 1, type: 'Property', description: 'New property added: Modern Apartment in Downtown', date: '2024-08-22' },
      { id: 2, type: 'User', description: 'New user registration: User 151', date: '2024-08-23' },
      { id: 3, type: 'Subscription', description: 'Subscription updated: User 10 upgraded to Premium', date: '2024-08-24' },
    ],
    topProperties: [
      { name: 'Luxury Villa', bookings: 50 },
      { name: 'Cozy Cottage', bookings: 45 },
      { name: 'Downtown Loft', bookings: 40 },
    ],
    userFeedback: [
      { rating: 5, count: 30 },
      { rating: 4, count: 20 },
      { rating: 3, count: 15 },
      { rating: 2, count: 10 },
      { rating: 1, count: 5 },
    ],
  };

  const {
    subscriptions,
    totalRevenueFromSale: totalRevenue,
    monthlyRevenue,
    userGrowth,
    recentActivities,
    topProperties,
    userFeedback,
  } = dummyData;



  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const FEEDBACK_COLORS = ['#FF5733', '#FFC300', '#DAF7A6', '#28B463', '#1F618D'];

  return (
    <Content style={{ padding: '24px', minHeight: '100vh', background: '#FAF9F6' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Properties"
              value={property.length}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Users"
              value={users.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Active Subscriptions"
              value={noOfSubcription.length}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24} lg={12}>
          <Card title="Monthly Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyRevenue}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={userGrowth}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24} lg={12}>
          <Card title="Subscriptions Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptions}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {subscriptions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card title="Top Properties">
            <List
              itemLayout="horizontal"
              dataSource={topProperties}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`Bookings: ${item.bookings}`}
                    avatar={<Avatar icon={<HomeOutlined />} />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24} lg={12}>
          <Card title="User Feedback">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userFeedback}
                  dataKey="count"
                  nameKey="rating"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {userFeedback.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FEEDBACK_COLORS[index % FEEDBACK_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card title="Recent Activities">
            <List
              itemLayout="vertical"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  extra={<Tooltip title={item.date}><InfoCircleOutlined style={{ fontSize: '20px', color: '#08c' }} /></Tooltip>}
                >
                  <List.Item.Meta
                    title={item.type}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default AdminDashboard;