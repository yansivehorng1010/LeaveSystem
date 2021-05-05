import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import LogoIG from '../assets/image/LogoIG.svg';
import { SidebarData } from './SidebarData';
import { SubMenu } from './SubMenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { arr } from './nav';

export const Layout = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };
  const auth = JSON.parse(localStorage.getItem('user-login') || '');
  if (!auth) return <Redirect to="/login" />;
  return (
    <Router>
      <div className="flex bg-gray-200">
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <img className="w-24 h-24" src={LogoIG} />
              <span className="mx-2 text-xl font-semibold text-white">
                CLAIM & LEAVE
              </span>
            </div>
          </div>
          <div className="w-full">
            {SidebarData.map((item: any, index: any) => {
              console.log('item-sidebar', item);
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex justify-between px-6 py-2 bg-gray-100 border-b-2 border-gray-700 shadow-sm ">
            <div />
            <div className="text-3xl font-bold text-yellow-400">
              IG Leave Application
            </div>
            <button
              className="px-4 py-2 font-semibold text-white bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={logOut}
            >
              Logout
            </button>
          </header>
          <div>
            {/* <div className="flex items-center justify-center h-screen">
              <img src={LogoIG} />
            </div> */}
            {arr.map((d, index) => (
              <Route exact key={index} path={d.path} component={d.component} />
            ))}
          </div>
        </div>
      </div>
    </Router>
  );
};
