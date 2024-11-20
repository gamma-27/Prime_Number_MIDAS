import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrimeComponent = () => {
  const [primeRecords, setPrimeRecords] = useState([]);

  useEffect(() => {
    // Function to fetch prime number records from the server
    const handleGetPrimeRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setPrimeRecords(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch of data when component mounts
    handleGetPrimeRecords();

    // Polling interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      handleGetPrimeRecords();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure polling runs continuously

  return (
    <div className='text-center justify-center bg-red-100  '>
      <div className='text-red-600 font-bold text-2xl underline hover:text-red-900 p-6'> Prime Number Records </div>
      <ul>
        {primeRecords.map((record, index) => (
          <li key={index}>
            <p className='text-semibold text-red-500 text-lg'>Date: {new Date(record.Date).toLocaleDateString()}</p>
            <p className='text-semibold text-red-500  text-lg'>Start: {record.start}</p>
            <p className='text-semibold text-red-500  text-lg'>End: {record.end}</p>
            <p className='text-semibold text-red-500  text-lg'>Algorithm: {record.algorithm}</p>
            <p className='text-semibold text-red-500  text-lg'>Num Primes: {record.numPrimes} </p>
            <p className='text-semibold text-red-500  text-lg'>Primes: {record.primes.join(', ')}</p>
            <p className='text-semibold text-red-500  text-lg'>Elapsed Time: {(record.elapsedTime)}milliseconds</p>
            <div className='h-[0.1rem] border my-2 bg-gray-600 border-red-700'></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrimeComponent;
