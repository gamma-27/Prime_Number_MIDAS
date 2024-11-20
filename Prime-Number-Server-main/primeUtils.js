function isPrime(start, end) {
    let primes = [];
    let sieve = new Array(end + 1).fill(true);
    sieve[0] = sieve[1] = false;

    // Mark multiples of primes starting from 2
    for (let p = 2; p * p <= end; p++) {
        if (sieve[p]) {
            for (let i = p * p; i <= end; i += p) {
                sieve[i] = false;
            }
        }
    }

    // Collect primes within the range
    for (let i = start; i <= end; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }
   
    return primes;
}

// Trial Division
function trialDivision(start, end) {
    let primes = [];
    for (let num = start; num <= end; num++) {
        let isPrime = num > 1;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(num);
    }
    return primes;
}

// Sieve of Sundaram
function sieveOfSundaram(start, end) {
    let primes = [];
    let n = Math.floor((end - 1) / 2);
    let marked = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        for (let j = i; (i + j + 2 * i * j) <= n; j++) {
            marked[i + j + 2 * i * j] = true;
        }
    }

    if (start <= 2) primes.push(2);

    for (let i = 1; i <= n; i++) {
        if (!marked[i] && (2 * i + 1) >= start) primes.push(2 * i + 1);
    }
    return primes;
}

// Sieve of Atkin
function sieveOfAtkin(start, end) {
    let primes = [];
    let sieve = new Array(end + 1).fill(false);

    for (let x = 1; x * x <= end; x++) {
        for (let y = 1; y * y <= end; y++) {
            let n = 4 * x * x + y * y;
            if (n <= end && (n % 12 === 1 || n % 12 === 5)) sieve[n] = !sieve[n];
            n = 3 * x * x + y * y;
            if (n <= end && n % 12 === 7) sieve[n] = !sieve[n];
            n = 3 * x * x - y * y;
            if (x > y && n <= end && n % 12 === 11) sieve[n] = !sieve[n];
        }
    }

    if (start <= 2 && end >= 2) primes.push(2);
    if (start <= 3 && end >= 3) primes.push(3);

    for (let r = 5; r <= end; r++) {
        if (sieve[r]) primes.push(r);
    }

    return primes.filter(p => p >= start);
}

// Simplified Miller-Rabin Primality Test
function millerRabinTest(start, end, k = 5) {
    // Function to perform Miller-Rabin primality test
    function isPrime(num) {
        if (num < 2) return false;
        if (num === 2 || num === 3) return true;  // 2 and 3 are prime
        if (num % 2 === 0) return false;  // Eliminate even numbers greater than 2

        // Write num-1 as 2^s * d
        let s = 0;
        let d = num - 1;
        while (d % 2 === 0) {
            d /= 2;
            s += 1;
        }

        // Miller test for a single base a
        function millerTest(a, d, num) {
            let x = BigInt(a) ** BigInt(d) % BigInt(num);
            if (x === 1n || x === BigInt(num - 1)) return true;

            for (let r = 0; r < s - 1; r++) {
                x = (x * x) % BigInt(num);
                if (x === BigInt(num - 1)) return true;
            }
            return false;
        }

        // Perform k Miller-Rabin tests with different bases
        for (let i = 0; i < k; i++) {
            let a = Math.floor(Math.random() * (num - 4)) + 2;  // Random base a in the range [2, num-2]
            if (!millerTest(a, d, num)) return false;
        }

        return true;
    }

    let primes = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}


// AKS Primality Test (simplified, does not cover all optimizations)
function aksTest(n) {
    if (n <= 1) return false; // 0 and 1 are not prime
    if (n === 2 || n === 3) return true; // 2 and 3 are prime

    // Step 1: Find the smallest integer r such that r^2 > n
    let r = 2;
    while (r * r <= n) r++;

    // Step 2: Find the smallest integer a such that the gcd of n and a is 1
    let a = 2;
    while (a <= r) {
        if (gcd(n, a) === 1) break;
        a++;
    }

    // Step 3: Check if n is a perfect power
    for (let b = 2; b <= Math.sqrt(n); b++) {
        if (Math.pow(Math.floor(Math.pow(n, 1 / b)), b) === n) {
            return false; // n is a perfect power
        }
    }

    // Step 4: Further advanced checks (skipped for simplicity)
    // This is where full AKS complexity comes in and involves many more steps.
    
    return true; // Placeholder, actual AKS is far more complex
}

// Helper function for gcd
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


module.exports = {
    isPrime,
    trialDivision,
    sieveOfSundaram,
    sieveOfAtkin,
    millerRabinTest,
    aksTest
};
