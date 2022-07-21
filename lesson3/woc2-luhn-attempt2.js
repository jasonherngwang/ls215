/*
The Luhn formula is a simple checksum formula used to validate a variety of 
identification numbers, such as credit card numbers and Canadian Social 
Insurance Numbers.

The formula verifies a number against its included check digit, which is usually 
appended to a partial number to generate the full number. This number must pass 
the following test:

Counting from the rightmost digit and moving left, double the value of every 
second digit
For any digit that thus become 10 or more, subtract 9 from the result
1111 becomes 2121
8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)
Add all these digits together
1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
8763 becomes 7733, and 7 + 7 + 3 + 3 is 20
If the total (the checksum) ends in 0 (put another way, if the total modulo 10 
  is congruent to 0), then the number is valid according to the Luhn Formula; 
  else it is not valid. Thus, 1111 is not valid (as shown above, it comes out 
    to 6), while 8763 is valid (as shown above, it comes out to 20).

Write a program that, given a number in string format, check if it is valid per 
the Luhn formula. This should treat, for example, "2323 2005 7766 3554" as 
valid. You can ignore all non-numeric characters in the input string.

Problem
Write a program that, given a number in string format, checks if it is valid per 
the Luhn formula.

Inputs: 1 number in string format
- This is the "partial number". It is not the "full number" since the check 
  digit has not yet been created and appended.
Outputs: True if valid Luhn num, false if not.

Rules, Requirements, Definitions
Check digit (checksum): A number created from the input number.
To create a check digit from a partial number:
- For a number with an even number of digits:
  - Double the number at every other index, starting from index 0.
- For a number with an odd number of digits:
  - Double the number at every other index, starting from index 1.
- Doubling function: If `num` * 2 > 10, subtract 9
  - Only 1 subtraction operation is needed, since max number is 9, so 
  18 - 9 = 9.
  - Impossible to have a result of 0, so don't need to worry about leading
    zeroes, octal.
- Sum all digits
- If sum ends in 0, this partial number is valid.

Other rules
- Ignore non-numeric (0-9) characters in input string
- Doubling takes a single digit number and returns a single digit number.

Examples, Test Cases, Edge Cases
// Generic test cases
console.log(validLuhn('1111')); // false
console.log(validLuhn('8763')); // true
console.log(validLuhn('2323 2005 7766 3554')); // true

// Few digits
console.log(validLuhn('0')); // true
console.log(validLuhn('2')); // false
console.log(validLuhn('02')); // false
console.log(validLuhn('0000000')); // true
console.log(validLuhn('0100000')); // false

// Edge cases
// Empty string input
console.log(validLuhn('')); // false

// All non-numbers
console.log(validLuhn('abc')); // false

// Mixed numbers and non-numbers
console.log(validLuhn('abc8763')); // true
console.log(validLuhn('a8b7c6d3e')); // true
console.log(validLuhn('2323-2005-7766-3554')); // true

// Spaces
console.log(validLuhn('   8 7 6 3    ')); // true

// Spaces and mixed numbers and non-numbers
console.log(validLuhn('???? 8 7 6 3 !! ')); // true

// Missing input
console.log(validLuhn()); // true

// Too many inputs
console.log(validLuhn('8763', '1111')); // true

// Undesired data type
console.log(validLuhn(null)); // false
console.log(validLuhn(undefined)); // false
console.log(validLuhn(8763)); // false
console.log(validLuhn([8763])); // false
console.log(validLuhn([8763: 8763])); // false
console.log(validLuhn(/[a-z]/)); // false
console.log(validLuhn(function abc() {})); // false


Edge cases
- Empty string => false
- Non-number characters => remove them first
- Padding, spacing => remove
- Missing argument => false
- Too many arguments => only consider first arg
- Non-string data type => false

Data Structure
Split number into array of digits.
- Abstractions, transformation

Algorithm
Guard clauses
- If arguments length is 0, return false.
- If typeof is not string, return false.
- Remove non-numbers using regex.
- If empty string return false.

Steps
- Split string into array of single digits.
  - Convert strings to numbers.
- Iterate from 2nd-to-last index to 0, decrementing by 2.
  - Reassign the element at that index to its doubled value, using the helper
    function.
- Sum all numbers.
- Take modulus of 10.
- Return true if result is 0, false otherwise.

Helper function: Double a digit
- Double the digit.
- Subtract 9 if result >10.
- Return the result

*/

'use strict';

function doubler(num) {
  let double = num * 2;
  return double >= 10 ? double - 9 : double;
}

// console.log(doubler(0)); // 0
// console.log(doubler(0)); // 0
// console.log(doubler(7)); // 5
// console.log(doubler(9)); // 9

function validLuhn(numStr) {
  if (arguments.length === 0) return false;
  if (typeof numStr !== 'string') return false;
  let cleaned = numStr.replace(/[^0-9]/g, '');
  if (cleaned.length === 0) return false;

  let digits = [...cleaned].map(Number);

  for (let i = digits.length - 2; i >= 0; i -= 2) {
    digits[i] = doubler(digits[i]);
  }

  let sum = digits.reduce((sum, num) => sum + num);

  return sum % 10 === 0;
}

// // Generic test cases
// console.log(validLuhn('1111')); // false
// console.log(validLuhn('8763')); // true
// console.log(validLuhn('2323 2005 7766 3554')); // true

// // Few digits
// console.log(validLuhn('0')); // true
// console.log(validLuhn('2')); // false
// console.log(validLuhn('02')); // false
// console.log(validLuhn('0000000')); // true
// console.log(validLuhn('0100000')); // false

// // Edge cases
// // Empty string input
// console.log(validLuhn('')); // false

// // All non-numbers
// console.log(validLuhn('abc')); // false

// // Mixed numbers and non-numbers
// console.log(validLuhn('abc8763')); // true
// console.log(validLuhn('a8b7c6d3e')); // true
// console.log(validLuhn('2323-2005-7766-3554')); // true

// // Spaces
// console.log(validLuhn('   8 7 6 3    ')); // true

// // Spaces and mixed numbers and non-numbers
// console.log(validLuhn('???? 8 7 6 3 !! ')); // true

// // Missing input
// console.log(validLuhn()); // false

// // Too many inputs
// console.log(validLuhn('8763', '1111')); // true
// console.log(validLuhn('1111', '8763')); // false

// // Undesired data type
// console.log(validLuhn(null)); // false
// console.log(validLuhn(undefined)); // false
// console.log(validLuhn(8763)); // false
// console.log(validLuhn([8763])); // false
// console.log(validLuhn({ 8763: 8763 })); // false
// console.log(validLuhn(/[a-z]/)); // false
// console.log(validLuhn(function abc() {})); // false
