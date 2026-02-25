import React from 'react'
import Home from './pages/Home/Home'
import Signin from './pages/Signin/Signin'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup/Signup'


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/admin/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
