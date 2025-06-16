import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Element />;
}