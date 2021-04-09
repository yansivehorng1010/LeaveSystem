import React, { useState } from 'react';
import { LoginForm } from './Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkToPage } from './LinkPage/LinkToPage';
function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/LinkToPage" component={LinkToPage} />
    </Router>
  );
}

export default App;
