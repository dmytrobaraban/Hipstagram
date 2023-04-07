import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';

const Auth = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="registration" element={<Registration />} />
    <Route path="*" element={<Navigate to="login" />} />
  </Routes>
);

export default Auth;
