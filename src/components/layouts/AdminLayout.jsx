import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const AdminLayout = ({ isLogin }) => {
  // Agar user login NAHI hai toh use login page pe bhej do
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;