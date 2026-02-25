import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Navigate } from 'react-router-dom'
import Users from '../../components/Users'
import { Layout, Typography, Card, Space } from 'antd' // Ant Design components

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className='home' style={{
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Navbar />

      <Content style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        <Card style={{
          width: '100%',
          maxWidth: '800px',
          marginBottom: '24px',
          borderRadius: '8px'
        }}>
          <Space direction="vertical" size="small">
            <Title level={2} style={{ margin: 0, color: '#2c3e50' }}>
              Welcome, {user.name}
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Email: <strong>{user.email}</strong>
            </Text>
          </Space>
        </Card>


        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <Users />
        </div>

      </Content>
    </Layout>
  )
}

export default Home