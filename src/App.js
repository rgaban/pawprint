import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import AddEvent from './container/AddEvent/AddEvent';
import EventsHistory from './container/EventsHistory/EventsHistory';
import './App.css';

function App() {

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/events" component={EventsHistory} />
          <Route path="/" exact component={AddEvent} />
          {/*<Redirect to="/" />*/}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
