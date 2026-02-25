import React from 'react';
import { Form, Card, Typography, Layout } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useFormHandler } from '../../hooks/useFormHandler';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;


const Signup = () => {

  const navigate = useNavigate();

  // Logic ko hook mein daal diya
  const { loading, onFinish } = useFormHandler((values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Success:", values);
    navigate("/login");
  });

  return (
    <Layout className='home' style={{
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ maxWidth: 400, margin: '50px auto' }}>

         <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <BaseInput
            name="name"
            label="Full Name"
            placeholder="Enter name"
            prefix={<UserOutlined />}
            rules={[{ required: true }]}
          />

          <BaseInput
            name="email"
            label="Email Address"
            placeholder="Email"
            prefix={<MailOutlined />}
            rules={[{ required: true, type: 'email' }]}
          />

          <BaseInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            prefix={<LockOutlined />}
            rules={[{ required: true, min: 6 }]}
          />

          <BaseButton loading={loading} htmlType="submit">
            Register Now
          </BaseButton>
        </Form>

        <div style={{ marginTop: 15, textAlign: 'center' }}>
          <Text level={4}>Create Account <Link to="/login"> Login </Link></Text>
        </div>

      </Card>
    </Layout>
  );
};

export default Signup;