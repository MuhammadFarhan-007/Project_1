import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import AuthLayout from './components/layouts/AuthLayout'
import AdminLayout from './components/layouts/AdminLayout'
import { useSelector } from 'react-redux'

const App = () => {
  // state.auth isliye kyunki aapne store mein 'auth' key rakhi hai
  // Check karein ke aapka slice 'user' save kar raha hai ya nahi
  const user = useSelector((state) => state.auth.isLogin); 
  const isLogin = !!user; // Agar user object hai to true, warna false
  console.log("REDUX USER DATA:", isLogin);


  return (
    <div className='app'>
      <Routes>
        {/* Auth Layout: Login user ko wapas login page pe nahi jane dega */}
        <Route element={<AuthLayout isLogin={isLogin} />}>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
        </Route>

        {/* Admin Layout: Sirf login user ke liye */}
        <Route path='/admin' element={<AdminLayout isLogin={isLogin} />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App