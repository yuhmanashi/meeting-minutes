import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from '../components/Home';
import Splash from '../components/Splash';

function Routes() {
    return (
        <Switch>
          <Route path='/' exact component={Splash}/>
          <Route path='/home'>
            <Home />
          </Route>
        </Switch>
    );
  }
  
  export default Routes;