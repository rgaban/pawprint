// import React, { useState } from 'react';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Layout from './hoc/Layout/Layout';
import AddEvent from './container/AddEvent/AddEvent';
import EventsHistory from './container/EventsHistory/EventsHistory';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  let routes = (
    <Switch>
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );

  if (currentUser) {
    routes = (
      <Switch>
        <Route path="/events" component={EventsHistory} />
        <Route path="/" exact component={AddEvent} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
        <Layout>
          {routes}
        </Layout>
    </div>
  );
}

export default App;
