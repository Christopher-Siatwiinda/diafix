import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

export default function PrivateRoute({component: Component, ...rest}) {
    const currentUser = localStorage.getItem("user");

  return (
    currentUser ? <Outlet/> : <Navigate to="/login"/>
  )
}
