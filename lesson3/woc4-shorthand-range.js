/*
Problem
------------------------------------------
You are given a list of numbers in a "short-hand" range where only the significant part of the next number is written because we know the numbers are always increasing (ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]). Some people use different separators for their ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers [1, 2, 3, 11, 12]). Range limits are always inclusive.

Your job is to return a list of complete numbers.

The possible separators are: ["-", ":", ".."]

Inputs: 1 string, representing one or a set of ranges
Outputs: 1 array containing the individual elements of all the ranges, combined

Requirements
A "range" is a string representing:
1. A single number, e.g. 1
2. A series of consecutive numbers, e.g. [1, 5, 2]

Only the significant part of the number is displayed

Range strings are separated by '-', ':', or '..'
  - Can have multiple separators, e.g. '1:5:2'
  - Can have a mixture of separator types, e.g. '1-5..2'
  - Can have contiguous separator, e.g. '1-:-5..-:2'


A "list" is the input string. It represent one or more ranges, comma-separated.
- If only one range, there is no comma separator
- If multiple ranges, they are comma-separated
  - There can be whitespace around commas
- The first number in a range is greater than the last element in the previous
  range.
  - Each range is associated with a "minimum value" which is the last element
    in the previous range + 1. The first element of each range is equal to or
    greater than this minimum value
    - The first range has a minimum value of 0.

    - Analysis of range
  - Check for separators: -, :, ..
    - If no separators, then this is a single-element range. Evaluate its value
      using its minimum value
    - If separators are present, split the range string by the separator.
    - Iterate over the array of range parts
      - Initialize a range of elements
      - For the first element, calculate its value based on the range's
        minimum value
      - For successive elements, if it is greater than the previous element,


Clarifying Questions
- 

Examples, Test Cases
------------------------------------------
"1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
- Comma-separated
- Single elements, no ranges

"1-3, 1-2" --> 1, 2, 3, 11, 12
- Comma-separated
- Ranges separated by dash
- Each range only has 1 start and 1 end, e.g. '1-2'.
  No multi-part ranges like '1-2-3'.

"1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
- No commas
- Multi-part range
  - If middle part is greater than last part, then we need to move to the next
    factor of 10 up.

"104-2" --> 104, 105, ... 112
- First number is not a single digit
- Use remainder operator 104 % 10 to obtain "base" number", e.g. 100.
  - Then consider the single significant digit, e.g. 4

"104-02" --> 104, 105, ... 202
- If end of range contains more than 1 digit, then use remainder 104 % 100

"545, 64:11" --> 545, 564, 565, .. 611
- Comma-separated ranges are completely separated, as long as the start of the
  each successive range is a value greater than the end of the previous range.

Data Structure, Algorithm
------------------------------------------
For the list, use an array to hold the ranges, so we can assemble them at the end.
For each range, use an object to hold:
- Individual range parts
- Minimum value (initialized to 0)
Examples:
{ minValue: 0, range: ['1', '5', '2'], }
{ minValue: 546, range: ['64', '11'], }

Algorithm
High level:
- Split list into ranges (an array)
- Split ranges into parts (objects & arrays)
- Process each range into an array of individual numbers
  - Each element depends on the previous number
- Each range depends on the previous range (for minimum value)
- Merge all ranges of numbers together, for the final result

Helper function: Use string to determine next greatest number, based on previous
string
- Must use string to be able to process '104-02'
Steps
- Convert first string to a number
- If second string has length N:
  - Replace last N characters of the first string with the second string
  - Convert to number
  - Add 10 until it it greater than the first number.



- Assume each range is an object. 
- Convert each value in the range Array value to a number.
- If array length is 1, this is a single element. Evaluate the value using
  the minimum value.
- If array length is >1, it needs further processing.
  - I

Function: Process a range into an array of numbers
- Initialize an empty result array.
- Split the range using separators (any of the 3), into an array of strings
- Convert the first element into a number, and append it to the result array.
- Iterate over the rest of the elements



Function: Process Entire Range String (comma-separated)

*/

'use strict';

/*
Helper function: Next larger number string
Inputs: 2 number strings
Output: 1 string, the number represented by the second string, that is next 
larger than the first.
*/
function nextLarger(first, second) {
  let firstNum = Number(first);
  let secondStr = first.slice(0, -second.length) + second;
  let secondNum = Number(secondStr);
  while (secondNum < firstNum) secondNum += 10 ** second.length;
  return String(secondNum);
}

// console.log(nextLarger('1', '2') === '2');
// console.log(nextLarger('1', '3') === '3');
// console.log(nextLarger('64', '11') === '111');
// console.log(nextLarger('104', '2') === '112');
// console.log(nextLarger('104', '02') === '202');
// console.log(nextLarger('3', '2') === '12');

/* 
Helper function: Fill in missing element between start and end
- Purpose is to be concatenated after the first element
Input: 2 numbers, start and end
Output: An array of numbers from start+1 to end, separated by 1
*/
function fillRangeToEnd(start, end) {
  let result = [];
  for (let nextNum = start + 1; nextNum <= end; nextNum += 1) {
    result.push(nextNum);
  }
  return result;
}

// console.log(fillRangeToEnd(1, 3)); // [2, 3]
// console.log(fillRangeToEnd(3, 7)); // [4, 5, 6, 7]

/*
Helper function: Convert any shorthand into full number representation.
Input: Array of number strings. Some can be written shorthand.
Output: A copy of the input array, but with shorthand converted to full number 
value
*/
function convertShorthandToActual(array) {
  let result = [array[0]];
  array.slice(1).forEach((nextNum) => {
    result.push(nextLarger(result[result.length - 1], nextNum));
  });
  return result;
}

// console.log(convertShorthandToActual(['1-3']));
// console.log(convertShorthandToActual(['1', '5', '2']));
// console.log(convertShorthandToActual(['104', '2']));
// console.log(convertShorthandToActual(['104', '02']));
// console.log(convertShorthandToActual(['64', '11']));

/* 
Helper function: Fill in gaps in a range of numbers
Input: Array of numbers
Output: Array of numbers, with any gaps filled. Elements are separated by 1.
*/
function fillInRangeGaps(array) {
  let result = [array[0]];
  array.slice(1).forEach((nextNum) => {
    result.push(...fillRangeToEnd(result[result.length - 1], nextNum));
  });
  return result;
}

// console.log(fillInRangeGaps([1, 3]));
// console.log(fillInRangeGaps([1, 3, 7]));

/*
Helper function: Shift all number in an array, by a specified value.
Inputs:
- Array of numbers
- Minimum value
Output: Array of numbers that shifted so that they are greater than the minimum
value.
- The significant part of each number is preserved.
*/
function shiftArray(array, minValue) {
  let newStart = array[0];
  while (newStart < minValue) newStart += 10 ** String(array[0]).length;
  return array.map((num) => num + (newStart - array[0]));
}

// console.log(shiftArray([1, 2, 3], 1)); // [11, 12, 13]
// console.log(shiftArray([1, 2, 3, 4, 5], 101));

/* 
Helper function: Convert a range string into an array of numbers
- Split range string using separators
- Convert any shorthand strings into full number representations (as strings)
- Convert number strings into numbers
- Fill in gaps
*/
function processRange(rangeStr) {
  let parts = rangeStr.split(/[-.:]+/);
  parts = convertShorthandToActual(parts);
  parts = fillInRangeGaps(parts.map(Number));
  return parts;
}

// console.log(processRange('1'));
// console.log(processRange('1-3'));
// console.log(processRange('1:5:2'));
// console.log(processRange('104-2'));
// console.log(processRange('64:11'));

/* 

*/
function processList(rangeList) {
  let ranges = rangeList.replace(/\s+/g, '').split(',');
  ranges = ranges.map((range) => processRange(range));
  for (let i = 1; i < ranges.length; i += 1) {
    let minValue = ranges[i - 1][ranges[i - 1].length - 1] + 1;
    ranges[i] = shiftArray(ranges[i], minValue);
  }
  return ranges.flat();
}

console.log(processList('1, 3, 7, 2, 4, 1')); // 1, 3, 7, 12, 14, 21
console.log(processList('1-3, 1-2')); // 1, 2, 3, 11, 12
console.log(processList('1:5:2')); // 1, 2, 3, 4, 5, 6, ..12
console.log(processList('7-5-2')); // 7, 8, 9, 10, 11, ..22
console.log(processList('104-2')); // 104, 105, ..112
console.log(processList('104--2')); // 104, 105, ..112
console.log(processList('104-02')); // 104, 105, ..202
console.log(processList('545, 64:11')); // 545, 564, 565, ..611
console.log(processList('1, 3, 2-7, 1')); // 1, 3, 12, 13, 14, 15, 16, 17, 21
console.log(processList('1:3:1, 2, 3, 4-5')); // 1, 2, 3, ..11, 12, 13, 14, 15
console.log(processList('   1, 3,   2, 1  ')); // 1, 3, 12, 21
