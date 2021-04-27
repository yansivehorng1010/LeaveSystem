import React, { useState } from 'react';
import { LoginForm } from './Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './Components/Dashboard';
import { Company } from './Page/Company';
function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginForm} />
      <Route path="/Dashboard" component={Dashboard} />
      <Route exact path="/LoginForm" component={LoginForm} />
      {/* <Route exact path="/setting/company" component={Company} /> */}
    </Router>
  );
}
export default App;
