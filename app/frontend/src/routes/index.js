import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../components/Home';
import Splash from '../components/Splash';
import Students from "../components/Students";
import Meetings from "../components/Meetings";
import Charts from "../components/Charts";
import Calendar from "../components/Calendar";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";

function AppRoutes() {
  return (
    <Routes>
      {/* <AuthRoute path='/' exact component={Splash}/>
      <ProtectedRoute path='/home' component={Home}/> */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <AuthRoute>
            <Splash/>
          </AuthRoute>
        }
      />
      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
      />
      <Route
        path="meetings"
        element={
          <ProtectedRoute>
            <Meetings/>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="charts"
        element={
          <ProtectedRoute>
            <Charts/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
  
export default AppRoutes;