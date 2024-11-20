// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for the PrimeRecord collection
const PrimeSchema = new mongoose.Schema({
    Date: { // Define a field for the date of the record
        type: Date, // The type of the field is Date
        default: Date.now // Default to the current date and time
    },
    start: { // Define a field for the starting number
        type: Number, // The type of the field is Number
        required: true // It is required to have a value for this field
    },
    end: { // Define a field for the ending number
        type: Number, // The type of the field is Number
        required: true // It is required to have a value for this field
    },
    algorithm: { // Define a field for the algorithm used
        type: String, // The type of the field is String
        required: true // It is required to have a value for this field
    },
    numPrimes: { // Define a field for the number of primes found
        type: Number, // The type of the field is Number
        required: true // It is required to have a value for this field
    },
    primes: {
        type: [Number], // Array field to store prime numbers
        default: [] // Default value is an empty array
    },
    elapsedTime: { // Define a field for the time taken to execute the prime calculation
        type: Number, // The type of the field is Number (milliseconds)
        required: true // It is required to have a value for this field
    }
});

// Create a model from the schema for the PrimeRecord collection
const PrimeRecord = mongoose.model('PrimeRecord', PrimeSchema);

// Export the PrimeRecord model to be used in other files
module.exports = { PrimeRecord };
