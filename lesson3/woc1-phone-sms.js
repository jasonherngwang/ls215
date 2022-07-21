/*
Write a program that cleans up user-entered phone numbers so that they can be sent as SMS messages. Other than digits, the number may also contain special character such as spaces, dash, dot, and parentheses that should be ignored.

The rules are as follows:
- If the phone number is less than 10 digits, assume that it is a bad number.
- If the phone number is 10 digits, assume that it is good.
- If the phone number is 11 digits and the first number is 1, trim the 1 and use the last 10 digits.
- If the phone number is 11 digits and the first number is not 1, then it is a bad number.
- If the phone number is more than 11 digits, assume that it is a bad number.

For bad numbers, just a return a string of 10 `0`s.

Problem
------------------------------------------
Clean up user-entered phone numbers

Inputs: 1 string, representing a user-entered phone number
- Can contain special characters: ' ', '-', '.', '(', ')'
  - Ignore these characters
- Can contain digits. Consider these characters only.
Outputs: A string of 10 digits
- Last 10 digits of the original number if it's a good number
- Ten zeroes if it's a bad number

Requirements
- See problem statement
- Before considering the rules (10 and 11 digits), must first remove any 
  non-digit characters.

Clarifying Questions
- "SMS Message" is: A string of 10 contiguous digit characters.
- Since the output for bad numbers is a string, is the output for a good input also a 10-digit string (as opposed to a number)? Assume yes.
- Can input be empty string? Yes; this is covered by the first rule.
- Can input be non-string data type? No.
- Can more or less arguments be passed to the function? No; always 1 argument.


Examples, Test Cases
------------------------------------------
"Bad" Numbers
console.log(cleanNumber(''));                   // 0000000000 (empty string)
console.log(cleanNumber('123'));                // 0000000000 (< 10 digits)
console.log(cleanNumber('01234567890'));        // 0000000000 (11 digits but first is not 1)
console.log(cleanNumber('0123456789999990'));   // 0000000000 (>11 digits)

Happy Paths
console.log(cleanNumber('1234567890'));         // 1234567890 (10 digits)
console.log(cleanNumber('11234567890'));        // 11234567890 (11 digits; first is 1)
console.log(cleanNumber('123-456-7890'));       // 1234567890 (With special characters)
console.log(cleanNumber('(123)456-7890'));      // 1234567890 (With special characters)
console.log(cleanNumber('(123) 456 7890'));     // 1234567890 (With special characters)
console.log(cleanNumber('1 (123) 456 7890'));   // 11234567890 (With special characters; 11 digits)
console.log(cleanNumber('11-23.4567   890'));   // 11234567890 (With special characters; 11 digits)

Data Structure, Algorithm
------------------------------------------
Data Structure: Input is string. Keep as string and use regex

Summary: Remove non-digits and use regex to determine if valid 10 or 11-digit number

Regex
Remove non-digit chars: /[^0-9]/g
Valid 10-digit number: /^[0-9]{10}$/
Valid 11-digit number: /^1[0-9]{10}$/

Algorithm
- Use regex to replace non-digit chars with empty string ''
- If either regex matches, slice and return the last 10 chars.
- Return 10 zeroes, as a string.
*/

function cleanNumber(number) {
  let cleanedNumber = number.replace(/[^\d]/g, '');
  // if (/^[\d]{10}$/.test(cleanedNumber) || /^1[\d]{10}$/.test(cleanedNumber)) {
  //   return cleanedNumber.slice(-10);
  // }
  if (cleanedNumber.length === 10) return cleanedNumber;
  if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
    return cleanedNumber.slice(1);
  }
  return '0'.repeat(10);
}

// Invalid input
console.log(cleanNumber('')); // 0000000000 (empty string)
console.log(cleanNumber('    ')); // 0000000000 (empty string)
console.log(cleanNumber('seven')); // 0000000000 (all invalid characters)
console.log(cleanNumber('123')); // 0000000000 (< 10 digits)
console.log(cleanNumber('4 5 6.')); // 0000000000 (< 10 digits, invalid characters)
console.log(cleanNumber(' zero one')); // 0000000000 (< 10 digits, invalid characters)
console.log(cleanNumber('123456789x')); // 0000000000 (10 digits, invalid characters)
console.log(cleanNumber('01234567890')); // 0000000000 (11 digits but first is not 1)
console.log(cleanNumber('7777777777701234567890')); // 0000000000 (>11 digits but first is not 1)
console.log(cleanNumber('012345678994i3563947856387932499990')); // 0000000000 (>11 digits)

// Happy Paths
console.log(cleanNumber('8888888888')); // 1234567890 (10 digits)
console.log(cleanNumber('1234567890')); // 1234567890 (10 digits)
console.log(cleanNumber('123.456.7890')); // 1234567890 (10 digits)
console.log(cleanNumber('123-456-7890')); // 1234567890 (With special characters)
console.log(cleanNumber('123 456 7890')); // 1234567890 (With special characters)
console.log(cleanNumber('(123)456-7890')); // 1234567890 (With special characters)
console.log(cleanNumber('(123) 456 7890')); // 1234567890 (With special characters)
console.log(cleanNumber('           (123) 456 7890    ')); // 1234567890 (With special characters)

// 11 digits
console.log(cleanNumber('11234567890')); // 11234567890 (11 digits; first is 1)
console.log(cleanNumber('1 (123) 456 7890')); // 11234567890 (With special characters; 11 digits)
console.log(cleanNumber('11-23.4567   890')); // 11234567890 (With special characters; 11 digits)
