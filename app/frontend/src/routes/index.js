import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../components/Home';
import Splash from '../components/Splash';
import AllMeetings from "../components/Meetings";
import Students from "../components/Students";
import History from "../components/History";
import Test from "../components/Test";
import Calendar from "../components/Calendar";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";

function AppRoutes() {
  return (
    <Routes>
      {/* <AuthRoute path='/' exact component={Splash}/>
      <ProtectedRoute path='/home' component={Home}/> */}
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
            <AllMeetings/>
          </ProtectedRoute>
        }
      />
      <Route
        path="history"
        element={
          <ProtectedRoute>
            <History/>
          </ProtectedRoute>
        }
      />
      <Route
        path="students"
        element={
          <ProtectedRoute>
            <Students/>
          </ProtectedRoute>
        }
      />
      <Route
        path="calendar"
        element={
          <ProtectedRoute>
            <Calendar/>
          </ProtectedRoute>
        }
      />
      <Route
        path="test"
        element={
          <ProtectedRoute>
            <Test/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
  
export default AppRoutes;