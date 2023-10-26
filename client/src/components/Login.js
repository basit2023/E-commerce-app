import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState("");

const sumitHandler=async (e)=>{
    
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }
   try {
    const res= await axios.post('/user//login',user)
    if(res){
    alert(`Login Successfully!`);
    }
   } catch (error) {
    console.log(error);
    alert(`incorrect password!`);

   }
      
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={sumitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Enter Your email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            required
            className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Enter Your Password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            autoComplete="password"
            required
            className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onSubmit={sumitHandler}>
              Sign up
            </button>
          </div>
        </form>
      </div>
     </div>
  ) 
}

export default Login
