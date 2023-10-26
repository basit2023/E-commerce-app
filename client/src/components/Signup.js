import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
    };


    try {
      console.log("first run")
      const res = await axios.post('http://localhost:4000/user/register', user);
      console.log("2nd run")

      console.log("the resultant data is, ",res)
      if (res) {
      
        alert('Sign up successfully!');
      }
    
    } catch (error) {
      console.error('Error storing data:', error);
      
    }
    
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Enter Your First Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your First Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter Your Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Enter Your Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              autoComplete="current-phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Phone"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Enter Your Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="current-address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Address"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
