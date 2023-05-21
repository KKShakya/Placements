import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>} />
    </Routes>
  )
}

export default AllRoutes