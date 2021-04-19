import React from 'react';
import { LoginForm } from './Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './LinkPage/Dashboard';
function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/Dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
