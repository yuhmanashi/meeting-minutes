import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../components/Home';
import Splash from '../components/Splash';
import { AuthRoute, ProtectedRoute } from "../utils/route_util";

function Routes() {
  return (
    <Switch>
      <AuthRoute path='/' exact component={Splash}/>
      <ProtectedRoute path='/home' component={Home}/>
    </Switch>
  );
}
  
export default Routes;