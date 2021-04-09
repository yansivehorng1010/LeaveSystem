import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ListTodo } from '../Page/ListTodo';
// import UserTodoData from '../User/UserTodoData';
export const LinkToPage = () => {
  return (
    <Router>
      <div>
        <h3 className="mt-8 text-3xl font-bold text-center">
          Guys can click on link to show data
        </h3>
        <div className="flex justify-center mt-8 space-x-4">
          <p className="text-xl text-red-800 hover:bg-green-300">
            <Link to={`/Page`}>List Todos</Link>
          </p>
        </div>
      </div>
      <Switch>
        <Route path="/Page" component={ListTodo} />
      </Switch>
    </Router>
  );
};
