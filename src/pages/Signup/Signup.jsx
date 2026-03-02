import React from 'react';
import * as yup from 'yup';
import { Card, Typography, Layout, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';
import FormInput from '../../components/common/FormInput';

const { Title, Text } = Typography;

const Signup = () => {

  const navigate = useNavigate();

  const signupSchema = yup.object().shape({
    name: yup
      .string()
      .required("Full name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords must match")
      .required("Please confirm your password"),
  });


  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSignupSubmit = (data) => {
    // LocalStorage logic
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check agar email pehle se exist karti hai
    if (users.find(u => u.email === data.email)) {
      return message.error("This email already registered");
    }

    // Confirm password ko remove kar ke baki data save karein
    const { confirmPassword, ...userData } = data;
    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));
    message.success("Create account seccessfully. Now login");
    navigate("/login");
  };

  return (
    <Layout className='home' style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: 400, margin: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>

        <form onSubmit={handleSubmit(onSignupSubmit)}>

          <FormInput
            name="name"
            control={control}
            errors={errors}
            label="Full Name"
            placeholder="Name"
            prefix={<MailOutlined />}
          />

          <FormInput
            name="email"
            control={control}
            errors={errors}
            label="Email Address"
            placeholder="Email"
            prefix={<MailOutlined />}
          />

          <FormInput
            name="password"
            control={control}
            errors={errors}
            label="Password"
            placeholder="Password"
            prefix={<LockOutlined />}
          />

          <FormInput
            name="confirmPassword"
            control={control}
            errors={errors}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            prefix={<MailOutlined />}
          />

          <BaseButton htmlType="submit" style={{ width: '100%', marginTop: '10px' }}>
            Register Now
          </BaseButton>
        </form>

        <div style={{ marginTop: 15, textAlign: 'center' }}>
          <Text>Already have an account? <Link to="/login">Login</Link></Text>
        </div>
      </Card>
    </Layout>
  );
};

export default Signup;