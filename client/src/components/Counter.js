import React, { useState } from 'react';
import '../App.css';

export const Counter = () => {
    const [counter, setCounter]=useState(0)
    const handlerCounter=()=>{
          setCounter(counter+1)
       }
    const handlerDecCounter=()=>{
      if(counter>0){
        setCounter(counter-1)
      }
    }


  return (
    <div className='App'>
      
      <h1> Counter </h1>
      <button onClick={handlerCounter}>Click me for increment</button>
      <button onClick={handlerDecCounter}>Click me for decrement</button>
      <h3>Count: {counter}</h3>
      
      {/* <h3>Count: {counter}</h3> */}

    </div>
  );
};
