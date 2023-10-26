import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const checkUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log("The User is",storedUser)
      console.log("the user email is ",storedUser.email)
      if (storedUser.email === email) {
        
        setMessage('User found. Enter your new Password.');
      } else {
        
        setMessage('User not found. Please enter a valid username.');
      }
    } else {
      setMessage('No user found in the database.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={checkUser}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
