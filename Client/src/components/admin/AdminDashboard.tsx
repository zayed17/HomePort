import React from 'react';
import { Layout, Card, Statistic, Row, Col, Divider, List, Avatar } from 'antd';
import { HomeOutlined, UserOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { useGetAdminDashboardQuery } from '../../store/property/propertyApi';
import { useFindAllUsersQuery, useGetUserAdminDashboardQuery } from '../../store/user/userApi';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
  const { data = {} } = useGetAdminDashboardQuery({});
  const { data: userData = {} } = useGetUserAdminDashboardQuery({});
  const { data: users = [] } = useFindAllUsersQuery({});

  const subscribedUsers = users.filter((user: any) => user.subscriptionId).length;

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlyRevenue = Object.entries(data.monthlyRevenue || {}).map(([monthYear, revenue]) => {
    const [month, year] = monthYear.split(' ');
    return { monthYear, month, year: parseInt(year), revenue };
  }).sort((a, b) => a.year !== b.year ? a.year - b.year : monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  const totalRevenue = monthlyRevenue.reduce((sum, entry:any) => sum + entry.revenue, 0) + (userData.subscriptions?.reduce((total:any, sub:any) => total + sub.price, 0) || 0);

  const subscriptions = ['Basic', 'Standard', 'Premium'].map(type => ({
    name: type,
    value: userData.subscriptions?.filter((sub: any) => sub.type === type).length || 0,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Content style={{ padding: '24px', minHeight: '100vh', background: '#FAF9F6' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}><Card hoverable><Statistic title="Total Properties" value={data.properties?.length} prefix={<HomeOutlined />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="Total Users" value={users.length} prefix={<UserOutlined />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="Active Subscriptions" value={subscribedUsers} prefix={<DollarOutlined />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="Total Revenue" value={totalRevenue} prefix={<DollarOutlined />} /></Card></Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Monthly Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="userCount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Subscriptions Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={subscriptions} dataKey="value" nameKey="name" outerRadius={100}>
                  {subscriptions.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Properties">
            <List
              itemLayout="horizontal"
              dataSource={data.topProperties || []}
              renderItem={(item:any) => (
                <List.Item>
                  <List.Item.Meta title={item.name} description={`Bookings: ${item.bookings}`} avatar={<Avatar icon={<HomeOutlined />} />} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Recent Activities">
            <List
              itemLayout="vertical"
              dataSource={data.recentActivities || []}
              renderItem={(item:any) => (
                <List.Item>
                  <List.Item.Meta avatar={<Avatar icon={<InfoCircleOutlined />} />} title={item.description} description={item.date} />
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