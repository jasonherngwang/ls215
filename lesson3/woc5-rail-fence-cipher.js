/*
Problem
------------------------------------------
Implement encoding and decoding for the rail fence cipher.

The Rail Fence cipher is a form of transposition cipher that gets its name from the way in which it's encoded. It was already used by the ancient Greeks.

In the Rail Fence cipher, the message is written downwards on successive "rails" of an imaginary fence, then moving up when we get to the bottom (like a zig-zag). Finally the message is then read off in rows.

For example, using three "rails" and the message "WE ARE DISCOVERED FLEE AT ONCE", the cipherer writes out:

W . . . E . . . C . . . R . . . L . . . T . . . E
. E . R . D . S . O . E . E . F . E . A . O . C .
. . A . . . I . . . V . . . D . . . E . . . N . .

Then reads off:

WECRLTEERDSOEEFEAOCAIVDEN

Encoding
Inputs:
- 1 string, a message containing letters only
- 1 integer, the number of rails to use
Outputs: 1 string, encoded, containing letters only

Requirements
- 

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------
Encoding
--------
ABCDEF, rails = 2
A.C.E.
.B.D.F

ABCDEF, rails = 3
A...E.
.B.D.F
..C...

When encoding a string, we iterate over its characters from left to right.
The rail that each character is written on is:
1, 2, 3, 2, 1, 2, 3, ...

ABCDEF
123212

For N rails, we create an array [1, 2, 3, ..., N, N-1, ..., 2]
- Whenever we need to write another character, we increment an index by 1, and
  use this array to access the rail number.
- When we reach the end of the rail number array, we loop back to the beginning
  - Using a remainder operator % can be helpful for looping

For N rails, we can create N arrays and store characters in them.
This converts the message from 1 string into an array of arrays:
[
  [A,E]
  [B,D,F]
  [C]
]

To convert this nested array into a single encoded string, we join them:
AEBDFC

Decoding
--------
AEBDFC
112223

- Use the array we created for encryption: [1, 2, 3, ..., N, N-1, ..., 2]
- Repeat the array, until it is the length of the message string.
- Sort the encryption array (by numeric value)
- Create a nested array of length N.
- Iterate through the message characters and the array using the same index
  - Push the character onto the array corresponsing to the index
- Iterate through the encryption array, shifting characters from the front,
  until the message has been decoded.

Data Structure, Algorithm
------------------------------------------
Data Structure
- For N rails, use N arrays

*/

'use strict';

// Generate array of rail numbers (0-indexed) we can iterate over
function generateRailSequence(numRails) {
  let railSequence = [...Array(numRails)].map((_, i) => i); // Ascending
  railSequence.push(...railSequence.slice(1, -1).reverse()); // Descending
  return railSequence;
}

// console.log(generateRailSequence(0)); // []
// console.log(generateRailSequence(1)); // [ 0 ]
// console.log(generateRailSequence(3)); // [ 0, 1, 2, 1 ]
// console.log(generateRailSequence(5)); // [ 0, 1, 2, 3, 4, 3, 2, 1 ]

// Create new array by repeating an input array until the desired length
function repeatArray(array, outputArrayLength) {
  let quotient = Math.floor(outputArrayLength / array.length);
  let remainder = outputArrayLength % array.length;

  let outputArray = Array(quotient).fill(array);
  outputArray.push(array.slice(0, remainder));

  return outputArray.flat();
}

// console.log(repeatArray([1, 2, 3, 2], 7)); // [ 1, 2, 3, 2, 1, 2, 3 ]
// console.log(repeatArray([1, 2, 3, 2], 10)); // [ 1, 2, 3, 2, 1, 2, 3, 2, 1, 2 ]

function encode(message, numRails) {
  let cleanedMessage = message.replace(/\s/g, '');
  let railArrays = [...Array(numRails)].map((_) => []);
  let railSequence = generateRailSequence(numRails);
  railSequence = repeatArray(railSequence, message.length);

  [...cleanedMessage].forEach((char, index) => {
    let railNum = railSequence[index];
    railArrays[railNum].push(char);
  });

  return railArrays.flat().join('');
}

// console.log(encode('WE ARE DISCOVERED FLEE AT ONCE', 2)); // WAEICVRDLETNEERDSOEEFEAOC
console.log(encode('WE ARE DISCOVERED FLEE AT ONCE', 3)); // WECRLTEERDSOEEFEAOCAIVDEN

function decode(encodedMessage, numRails) {
  let railArrays = [...Array(numRails)].map((_) => []);
  let railSequence = generateRailSequence(numRails);
  railSequence = repeatArray(railSequence, encodedMessage.length);
  let railSequenceSorted = railSequence.slice().sort((a, b) => a - b);

  [...encodedMessage].forEach((char, index) => {
    let railNum = railSequenceSorted[index];
    railArrays[railNum].push(char);
  });

  let decodedMessage = '';
  railSequence.forEach((index) => {
    decodedMessage += railArrays[index].shift();
  });

  return decodedMessage;
}
console.log(decode('WECRLTEERDSOEEFEAOCAIVDEN', 3));
