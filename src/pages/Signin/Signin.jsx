import React, { useState } from 'react';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, message, Layout } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLogin } from '../../store/auth/authSlice';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';
import FormInput from '../../components/common/FormInput';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please Enter Correct Email")
      .required("Email Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password Required"),
  });

  // useForm Hook setup
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });
   console.log("errors",errors)

  // Login Handle Function
  const onLoginSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      dispatch(setLogin());
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      message.success("Login Successful!");
      navigate('/admin/home');
    } else {
      message.error("Incorrect your email or password");
    }
  };

  return (
    <Layout style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>

        {/* React Hook Form ka handleSubmit use kiya */}
        <form onSubmit={handleSubmit(onLoginSubmit)}>

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
            type="password"
            placeholder="Password"
            prefix={<LockOutlined />}
          />

          <BaseButton htmlType="submit" style={{ width: '100%', marginTop: '10px' }}>
            Login Now
          </BaseButton>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Text>Don't have an account? <Link to="/">Register</Link></Text>
        </div>
      </Card>
    </Layout>
  );
};

export default Signin;