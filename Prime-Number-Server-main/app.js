// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { PrimeRecord } = require('./module/prismaSchema');
const { isPrime, trialDivision, sieveOfSundaram, sieveOfAtkin, millerRabinTest, aksTest } = require('./primeUtils');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// POST route to add prime number record
app.post('/api/data', async (req, res) => {
    try {
        const { start, end, algorithm } = req.body;

        // Start the timer using process.hrtime for higher precision
        const startTime = process.hrtime();

        // Calculate prime numbers based on the selected algorithm
        let primes = [];
        switch (algorithm) {
            case 'isPrime':
                primes = sieveOfEratosthenes(start, end);
                break;
            case 'Trial Division':
                primes = trialDivision(start, end);
                break;
            case 'Sieve of Sundaram':
                primes = sieveOfSundaram(start, end);
                break;
            case 'Sieve of Atkin':
                primes = sieveOfAtkin(start, end);
                break;
            case 'Miller-Rabin Primality Test':
                primes = millerRabinTest(start, end);
                break;
                     case 'AKS Primality Test':
                primes = aksTest(start, end);
                break;
            default:
                primes = isPrime(start, end);
                break;
        }

        // Stop the timer
        const [seconds, nanoseconds] = process.hrtime(startTime);
        const elapsedTime = (seconds * 1000) + (nanoseconds / 1000000); // Convert to milliseconds

        const numPrimes = primes.length;

        // Create a new PrimeRecord instance with elapsed time
        const newRecord = new PrimeRecord({
            Date: Date.now(),
            start,
            end,
            algorithm,
            primes,
            numPrimes,
            elapsedTime // Store the calculated elapsed time
        });

        await newRecord.save(); // Save the record to the database
        res.status(201).json(newRecord); // Respond with the new record
    } catch (error) {
        console.error('Error adding record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to fetch prime number records
app.get('/api/data', async (req, res) => {
    try {
        // Fetch all prime records from the database
        const records = await PrimeRecord.find();
        res.status(200).json(records); // Respond with the records
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
