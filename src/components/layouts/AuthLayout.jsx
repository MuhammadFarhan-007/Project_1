import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = ({ isLogin }) => {
  // Agar user pehle se login hai aur /login page pe aaye, 
  // toh use dhakka maar ke home pe bhej do
  if (isLogin) {
    return <Navigate to="/admin/home" replace />;
  }
  return <Outlet />;
};

export default AuthLayout;