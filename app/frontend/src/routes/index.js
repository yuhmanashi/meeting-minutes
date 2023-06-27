import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "../components/Session/LoginForm";
import SignupFormPage from "../components/Session/SignupForm";
import Home from '../components/Home';

function Routes() {
    return (
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    );
  }
  
  export default Routes;