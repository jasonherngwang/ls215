/* 
Octal

Write a Function named octalToDecimal that performs octal to decimal conversion. When invoked on a String that contains the representation of an octal number, the Function returns a decimal version of that value as a Number. Implement the conversion yourself: do not use something else to perform the conversion for you.

Algo
- Split string into array of digits
- Reverse array
- Transform array, keeping track of digit and index
- Return digit * (8 ** index)
- Sum array, using reduce

*/

"use strict";

function octalToDecimal(numberString) {
  let digits = [...numberString].reverse();
  digits = digits.map((digit, index) => Number(digit) * 8 ** index);
  return digits.reduce((sum, num) => sum + num);
}

console.log(octalToDecimal("1")); // 1
console.log(octalToDecimal("10")); // 8
console.log(octalToDecimal("130")); // 88
console.log(octalToDecimal("17")); // 15
console.log(octalToDecimal("2047")); // 1063
console.log(octalToDecimal("011")); // 9

// Using a single reduce statement
function octalToDecimalReduce(numberString) {
  return numberString.split("").reduce((sum, num, index) => {
    return sum + Number(num) * Math.pow(8, numberString.length - index - 1);
  }, 0);
}

console.log(octalToDecimalReduce("1")); // 1
console.log(octalToDecimalReduce("10")); // 8
console.log(octalToDecimalReduce("130")); // 88
console.log(octalToDecimalReduce("17")); // 15
console.log(octalToDecimalReduce("2047")); // 1063
console.log(octalToDecimalReduce("011")); // 9
