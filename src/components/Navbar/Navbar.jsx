import React from 'react';
import { Layout, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/auth/authSlice";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("currentUser"));


  const handleSignOut = () => {
  localStorage.removeItem("currentUser");
  dispatch(setLogout());   // 👈 IMPORTANT
  navigate("/login");
};

  return (
    <Header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderRadius: '8px',
      padding: '20px 20px',
      background: '#e4e7ed', 
      boxShadow: '0 4px 12px rgba(102, 114, 241, 0.2)' 
    }}>
      <div className="navbar-left">
        <Title level={3} style={{ margin: 0,}}>Project-1</Title>
      </div>

      <div className="navbar-right">
        <Button 
          type="primary" 
          danger 
          icon={<LogoutOutlined />} 
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;