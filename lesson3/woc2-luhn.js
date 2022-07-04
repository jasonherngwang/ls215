/*
The Luhn formula is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers and Canadian Social Insurance Numbers.

The formula verifies a number against its included check digit, which is usually appended to a partial number to generate the full number. This number must pass the following test:

Counting from the rightmost digit and moving left, double the value of every second digit
For any digit that thus become 10 or more, subtract 9 from the result
1111 becomes 2121
8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)
Add all these digits together
1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
8763 becomes 7733, and 7 + 7 + 3 + 3 is 20
If the total (the checksum) ends in 0 (put another way, if the total modulo 10 is congruent to 0), then the number is valid according to the Luhn Formula; else it is not valid. Thus, 1111 is not valid (as shown above, it comes out to 6), while 8763 is valid (as shown above, it comes out to 20).

Write a program that, given a number in string format, check if it is valid per the Luhn formula. This should treat, for example, "2323 2005 7766 3554" as valid. You can ignore all non-numeric characters in the input string.

Problem
------------------------------------------
Write a function to check if a number (as a string) is valid per the Luhn formula.

Inputs: 1 string, representing an ID number
Outputs: 1 boolean: true if valid, false if not

Luhn Formula
1. Double every digit. If even number of digits, start from index 0. If odd, start from index 1.
  1a. If digits doubled >10, subtract 9 from it
2. Sum digits; this is the checksum
3. If last digit of checksum is 10 (checksum % 10 === 0), number is valid. Else, invalid.

Requirements
- Ignore all non-digit characters BEFORE performing the check.

Clarifying Questions
- "congruent" means "equal to"? Yes.

Examples, Test Cases
------------------------------------------


Data Structure, Algorithm
------------------------------------------
Data Structure
- May use regex to process the string first
- Convert string to array of digits
- Can transform digits from strings to numbers

Algorithm
- Use regex to remove non-digit characters from the string
- If no arguments passed, or argument is not a string, return false.
- If string length is 0, return false (empty input)
- Split string into array of digits.
  - Convert each digit to a number
- Check if the array length is even or odd
- Starting from index 0 (even length) or 1 (odd length), double the digit.
  If >= 10 subtract 9.
- Reduce the array to a sum
- Find the remainder after dividing by 10.
- If 0, return true. Else return false

Further Exploration
If the provided input string is not a valid Luhn number:
Write a function that can concatenate a check digit to the end of the input 
string to make the number a valid Luhn number. Return the original input string 
with the check digit concatenated to the end.

Input: 1 string, an invalid Luhn number
Output: 1 string, the input concatenated with 1 digit character. This is a valid
Luhn number

Algorithm: Brute force
- Try all combinations 0-9 concatenated to the end, and return the first one
  that results in a valid Luhn number

Algorithm
- Check if string is already valid. If so, return the cleaned version of itself.
- If not valid, clean the string and calculate the checksum of the string with 
  '0' concatenated to the end
- If checksum's last digit is already 0, use 0 as the last digit
  - Else, the required digit to make the the number valid is 10 - checksum
- Return the cleaned string with the last digit concatenated

Test Case
1111 -> 2121, checksum 6
1111? -> 1212?, checksum 6 + ?, ? is 4
6789 -> 3779, checksum 26
6789? -> 6589?, checksum 28 + ?, ? is 2

*/

'use strict';

function removeNonDigit(numberString) {
  return numberString.replace(/[^\d]/g, '');
}

function calcChecksum(numberString) {
  let digits = [...numberString].map(Number);
  let letStartIdx = digits.length % 2 === 0 ? 0 : 1;

  for (let i = letStartIdx; i < digits.length; i += 2) {
    let doubledDigit = digits[i] * 2;
    digits[i] = doubledDigit < 10 ? doubledDigit : doubledDigit - 9;
  }

  return digits.reduce((sum, num) => sum + num);
}

function checkLuhn(numberString) {
  if (typeof numberString !== 'string' || arguments.length === 0) return false;

  let cleanedNum = removeNonDigit(numberString);
  if (!cleanedNum.length) return false;
  let checksum = calcChecksum(cleanedNum);
  return checksum % 10 === 0;
}

console.log('The following should return false');
// Empty or missing input
console.log(checkLuhn()); // false (no input)
console.log(checkLuhn('a')); // false (invalid input; becomes empty string)
console.log(checkLuhn('')); // false (empty string)

// Non-string inputs
console.log(checkLuhn([8763])); // false (invalid input data type)
console.log(checkLuhn([])); // false (invalid input data type)
console.log(checkLuhn({ luhn: 0 })); // false (invalid input data type)

// Invalid Luhn numbers; checksum % 10 !== 0
console.log(checkLuhn('1')); // false (checksum is 1)
console.log(checkLuhn('5')); // false (checksum is 5)
console.log(checkLuhn('9')); // false (checksum is 9)
console.log(checkLuhn('1111')); // false (checksum is 6)
console.log(checkLuhn('h%s9 8s9fd87  )( ..86'));

console.log('The following should return true');
// 0 is a valid Luhn number since 0 % 10 is 0
console.log(checkLuhn('0')); // true
console.log(checkLuhn('00')); // true
console.log(checkLuhn('0000000000000000')); // true
console.log(checkLuhn('0a')); // true
console.log(checkLuhn('a   bc0')); // true
console.log(checkLuhn('a  00 bc0')); // true

// Valid Luhn numbers
console.log(checkLuhn('8763')); // true (checksum is 20)
console.log(checkLuhn('523456')); // true (checksum is 20)

/*
A longer valid Luhn number
2323200577663554
Doubling every other digit
4343400557366514
Checksum: 60
*/
console.log(checkLuhn('2323 2005 7766 3554')); // true (checksum % 10 === 0)
console.log(checkLuhn('2323-2005.7766(3554)')); // true (ignore non-numeric)

function createValidLuhn(numberString) {
  let cleanedNum = removeNonDigit(numberString);
  if (checkLuhn(numberString)) return numberString;

  let checksum = calcChecksum(cleanedNum + '0') % 10;
  if (checksum === 0) return cleanedNum + '0';
  return cleanedNum + String(10 - checksum);
}

console.log(createValidLuhn('')); // '0'
console.log(createValidLuhn('888')); // '8888' -> '7878' -> checksum 30
console.log(createValidLuhn('2323 2005 7766 355')); // '2323 2005 7766 3554'
console.log(createValidLuhn('8763')); // 8763 (already valid)
