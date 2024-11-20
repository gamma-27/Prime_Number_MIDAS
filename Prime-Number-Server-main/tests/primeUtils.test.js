// __tests__/primeUtils.test.js
const { isPrime } = require('../primeUtils');

describe('Prime Number Generator', () => {
  test('Generates primes between 1 and 10', () => {
    const result = isPrime(1, 10);
    expect(result).toEqual([2, 3, 5, 7]); // Expecting primes between 1 and 10
  });

  test('Generates primes between 11 and 20', () => {
    const result = isPrime(11, 20);
    expect(result).toEqual([11, 13, 17, 19]); // Expecting primes between 11 and 20
  });

  test('Generates no primes when range is 0 to 1', () => {
    const result = isPrime(0, 1);
    expect(result).toEqual([]); // No primes between 0 and 1
  });
});
