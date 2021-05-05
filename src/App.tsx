import React, { useState } from 'react';
import { LoginForm } from './Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={Layout} />
        {/* <Route path="/" component={LoginForm} /> */}

        {/* <Route exact path="/setting/company" component={Company} /> */}
      </Switch>
    </Router>
  );
}
export default App;
