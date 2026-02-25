import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Layout } from 'antd'; // Ant Design components
import { LockOutlined, MailOutlined } from '@ant-design/icons'; // Icons
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';


const Signin = () => {
  
  const navigate = useNavigate();
  const { Title, Text } = Typography;

  const handleLogin = (values) => {
    const { email, password } = values;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      message.success("Login Successful!");
      navigate('/admin/home');
    } else {
      message.error("Invalid Email or Password");
    }
  };

  return (
    <Layout className='home' style={{ 
      minHeight: '100vh', 
      background: '#f0f2f5', 
      display: 'flex', 
      alignItems: 'center' }}
      >
      <Card style={{ maxWidth: 400, margin: 'auto', width: '100%' }}>

        <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
        
        <Form layout="vertical" onFinish={handleLogin}>
          <BaseInput 
            name="email" 
            label="Email Address"
            placeholder="Email"
            prefix={<MailOutlined />}
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          />

          <BaseInput 
            name="password" 
            label="Password"
            type="password"
            placeholder="Password"
            prefix={<LockOutlined />}
            rules={[{ required: true, message: 'Please enter your password!' }]}
          />

          <BaseButton htmlType="submit" style={{ width: '100%' }}>
            Login
          </BaseButton>
        </Form>
        
        <div style={{ marginTop: 15, textAlign: 'center' }}>
          <Text>Don't have an account? </Text>
          <Link to="/">Register</Link>
        </div>
      </Card>
    </Layout>
  );
};

export default Signin