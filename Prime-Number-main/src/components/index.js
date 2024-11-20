import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

// Define Index component
const Index = () => {
  // Define state variables using useState hook
  const [startRange, setStartRange] = useState(null); // State for start range input
  const [endRange, setEndRange] = useState(null); // State for end range input
  const [algorithmType, setAlgorithmType] = useState(''); // State for algorithm type input
  const [primeCount, setPrimeCount] = useState(0); // State for the count of prime numbers found
  const [primeRecords, setPrimeRecords] = useState([]); // State for storing prime numbers found
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [elapsedTime, setElapsedTime] = useState(0); // State for elapsed time

  const navigate = useNavigate(); // Initialize navigate from useNavigate hook to handle navigation

  useEffect(() => {
    setStartRange(0);
    setEndRange(0);
  }, []); // Set initial values for start and end range when the component mounts

  // Function to fetch prime numbers from the backend
  const fetchPrimeNumbers = async () => {
    if (!startRange || !endRange || !algorithmType) {
      console.error('Please fill in all fields');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/data', {
          start: parseInt(startRange),
          end: parseInt(endRange),
          algorithm: algorithmType,
      });
      setLoading(false);
      setPrimeCount(response.data.numPrimes);
      setPrimeRecords(response.data.primes);
      setElapsedTime(response.data.elapsedTime); // Update elapsed time
  } catch (error) {
      console.error('Error fetching prime numbers:', error);
      setLoading(false);
  }
  };
  

  // Function to handle navigation to prime number records page
  const handleRedirect = () => {
    navigate('/database'); // Redirect to '/database' route
  };

  // JSX for rendering UI
  return (
    <div>
      <div className="font-sans bg-gray-100">
      <h1 className="text-4xl pt-10 font-bold text-center mb-8">Prime Number Generator</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 text-4xl font-bold mb-4">
          <span className="text-gray-700">2</span>
          <span className="text-gray-700">3</span>
          <span className="text-gray-700">5</span>
          <span className="text-2xl">+</span>
          <span className="text-red-500">7</span>
        </div>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-200 px-4 py-2 rounded-md">Prime</button>
          <button className="bg-blue-200 px-4 py-2 rounded-md">Numbers</button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-center mb-4">Generation Strategy</h2>
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-red-300 px-4 py-2 rounded-full">2</button>
          <button className="bg-blue-300 px-4 py-2 rounded-full">3</button>
          <button className="bg-orange-300 px-4 py-2 rounded-full">5</button>
          <button className="bg-gray-300 px-4 py-2 rounded-full">ALGORITHMS</button>
        </div>
        {/* <button className="bg-red-500 text-white px-6 py-2 rounded-lg mx-auto block">Generate</button> */}
      </div>

      
    {/* </div>
      <div className="container bg-gray-100 mx-auto">
        
      <div className="flex items-center justify-center h-screen">
        
  <img 
    src="https://img.freepik.com/free-vector/watercolor-number-collection_23-2147812908.jpg?t=st=1731605010~exp=1731608610~hmac=74f18feaf24e879e1e8524a11365b873c280fb419ae764dbf76b9bc4aca9ad4a&w=740" 
    alt="My Image" 
    className='w-full'
    style={{ height: "25rem" }} 
  />
</div> */}
  <form className="mb-8  bg-gradient-to-br from-gray-400 to-red-200">
          <div className='text-black shadow-xs font-bold py-5  text-2xl text-center'>Prime Number Generator</div>
          {/* Input fields for start and end range, and algorithm type */}
          <div className="mb-4 mr-4 text-center">
            <label className='font-semibold mr-5'>Enter the starting range:</label>
            <input type="number" name="start" value={startRange} onChange={(e) => setStartRange(e.target.value)} className="border border-gray-300 rounded-md p-2 ml-2" />
          </div>
          <div className="mb-4 mr-4 text-center">
            <label className='font-semibold mr-7'>Enter the ending range:</label>
            <input type="number" name="end" value={endRange} onChange={(e) => setEndRange(e.target.value)} className="border border-gray-300 rounded-md p-2 ml-2" />
          </div>
          <div className="mb-4 ml-4 mr-4 text-center">
  <label className='font-semibold mr-5'> Select The Algorithm:</label>
  <select 
    name="algorithm" 
    value={algorithmType} 
    onChange={(e) => setAlgorithmType(e.target.value)} 
    className="border border-gray-300 rounded-md p-2 ml-2"
  >
    <option value="">Select</option> {/* Default prompt */}
    <option value="Sieve of Eratosthenes">Sieve of Eratosthenes</option>
    <option value="Trial Division ">Trial Division </option>
    <option value="Sieve of Sundaram">Sieve of Sundaram</option>
    <option value="Sieve of Atkin">Sieve of Atkin</option>
    <option value="Miller-Rabin Primality Test">Miller-Rabin Primality Test</option>
     <option value="AKS Primality Test (Agrawal-Kayal-Saxena)">AKS Primality Test</option>
    
  </select>
</div>
          {/* Button to trigger prime number generation */}
          <div className="flex justify-center mt-5 items-center">
            <button type="button" onClick={fetchPrimeNumbers} className="bg-red-500 hover:bg-gray-700 mb-4 text-white font-bold py-2 px-4 rounded">
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
        </form>
        {/* Display prime numbers, algorithm type, and count */}
        <div className='border text-center justify-center font-normal  rounded-lg text-white pl-1 pb-2  bg-gradient-to-br from-red-400 to-red-500'>
          <h2 className="text-xl font-semibold text-white pt-5">Prime numbers between {startRange} and {endRange} are</h2>
          <div className='flex justify-center items-center text-center mx-10'>
            {/* Display prime numbers in a list */}
            {primeRecords.length > 0 && (
              <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, flexWrap: 'wrap' }} className="mb-2">
                {primeRecords.map((prime, index) => (
                  <li key={index} style={{ marginRight: '10px' }} className="text-xl font-semibold text-white">
                    {index !== 0 && ','} {prime}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Display algorithm type and count of prime numbers */}
          <p className=" text-xl font-semibold text-white">Algorithm used: {algorithmType} </p>
          <p className="mb-2 text-xl font-semibold text-white">Count of prime numbers: {primeCount}</p>
          <p className="mb-2 text-xl font-semibold text-white">Elapsed Time: {elapsedTime} ms</p>

        </div>
        <div className='flex justify-center items-center my-5'>
          {/* Button to navigate to prime number records page */}
          <button type="button" className=' bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded' onClick={handleRedirect}>
            Prime Number Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index; // Export Index component as default