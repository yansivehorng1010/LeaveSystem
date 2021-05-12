import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SubMenu = (props: any) => {
  const { item } = props;
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <nav className="mt-10 ">
      <Link to={item.path} onClick={item.subNav && showSubnav}>
        <div className="flex justify-between px-6 py-2 mt-4 text-gray-100 bg-opacity-25 hover:bg-gray-700">
          <div className="flex justify-start">
            <div className="mt-1">{item.icon}</div>
            <span className="mx-3">{item.title}</span>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item: any, index: any) => {
          return (
            <Link to={item.path} key={index}>
              <div className="flex px-12 py-2 text-gray-100 hover:bg-gray-700">
                <div className="flex justify-start">
                  <div className="mt-1">{item.icon}</div>
                  <span className="mx-3">{item.title}</span>
                </div>
              </div>
            </Link>
          );
        })}
    </nav>
  );
};
