import React, { useState, useMemo } from 'react';

const ExpensiveComponent = ({ number }) => {
  // A time-consuming calculation or function that you want to memoize
  const expensiveFunction = (number) => {
    console.log('Calculating...', number);
    let result = 2;
    result=number*result;
    // for (let i = 0; i < number; i++) {
    //   result += i;
    // }
    return result;
  };

  const memoizedValue = useMemo(() => expensiveFunction(number), [number]);
  return <div>{memoizedValue}</div>;
};
const Homepage = () => {
  const [count, setCount] = useState(10);
console.log(count)
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div className="bg-red-500 text-white p-4 h-20">From taiwind</div>
      <button onClick={handleClick}>Increment</button>
      <ExpensiveComponent number={count} />
    </div>
  );
}

export default Homepage
