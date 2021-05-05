import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const history = useHistory();
  const handleSubmit = async () => {
    console.warn(email, passWord);
    let item = { email, passWord };
    let result = await fetch(
      'http://114.119.182.183:8080/ClaimRest/users/login',
      {
        method: 'Post',
        body: JSON.stringify(item),
      }
    );
    result = await result.json();
    localStorage.setItem('user-login', JSON.stringify(result));
    history.push('/dashboard');
  };
  //   console.log(localStorage.getItem('user-login'), '000');
  const auth = JSON.parse(localStorage.getItem('user-login') || '');
  if (auth) return <Redirect to="/dashboard" />;
  console.log(auth, '==>auth');

  return (
    <div className="h-full mt-8">
      <div className="flex justify-center ">
        <form className="w-full px-8 pt-6 pb-8 mt-8 bg-green-200 rounded shadow-md lg:w-1/4">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Claim & Leave System
          </h2>
          <div className="py-5 mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              placeholder="Email"
            >
              Username
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              placeholder="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="***********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
