/*
Problem
------------------------------------------
Write a function to compare 2 version numbers.
- If version1 > version2, we should return 1.
- If version1 < version2, we should return -1.
- If version1 === version2, we should return 0.
- If either version number contains characters other than digits and 
  the . character, we should return null.

Inputs: 2 strings representing version numbers
Outputs: Integers -1, 0, or 1, or null for invalid input

Rules/Requirements
- A version number has one or more "sections" of positive numbers, separated by 
  single periods.
  - There can be any number of periods, or no periods at all.
  - Multiple periods in a row means the input is invalid
  - Periods at start or end of number means the input is invalid.
- Having any character other than digits and periods (punctuation, whitespace, 
  etc) means the input is invalid.
- Version numbers are compared section-by-section from left to right
  - Sections are compared numerically, not as strings
  - The leftmost section is the "largest" one, or the more major version
  - When comparing two numbers from left to right, if one of them has a larger
    section number, that one is the greater version number.
  - If one number has no more sections, but the other one does, the other one
    is the greater version number. Presence > Absence.
  - If all sections have been compared, and all are equal, the version
    numbers are equal.

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------
1 is equal to 1
1.1 is greater than 1.0
2.3.4 is less than 2.3.5

1.2.0.0 < 1.18.2
From left to right:
Position 1: 1 is the same
Position 2: 2 is smaller than 18, so second version number is greater

Edge Cases
- Missing argument? No; always 2.
- Empty string? Possible
- Invalid input characters? Possible

1.a               // Invalid; doesn't only have digits and periods.
.1 and 1.         // Invalid; period can't be at start or end
1..0              // Invalid; can't have multiple periods contiguous
1.0 and 1.0.0 are equal to 1  // Zeroes are implied
1.0.0 < 1.1       // Can compare numbers of different lengths
1.0 < 1.0.5       //  Can compare numbers of different lengths

Data Structure, Algorithm
------------------------------------------
Data Structure: Use an array to hold the sections of each version number

Algorithm
- Test both numbers for characters that are not digits or '.'.
  - If either contains prohibited characters, return `null` from the function.
- Split both version numbers into arrays of characters, using '.' as separator.
  - Map each array from strings to numbers
- Keep track of the number of sections in the version number that has more
  sections.
- Iterate from 0 to the number of sections - 1. This represent the array index.
  - Retrieve value at corresponding index in both arrays.
    - If this value is `undefined`, use a default value of 0
  - If first > second, return 1. 
  - If first < second, return -1.
  - If equal, continue iterating.
- If iteration complete, both are equal. Return 0
*/

function isValidVersionNumber(version) {
  return /^[0-9]+(\.[0-9]+)*$/.test(version);
}

function compareVersions(version1, version2) {
  // Ensure both are valid version numbers
  if (!isValidVersionNumber(version1) || !isValidVersionNumber(version2)) {
    return null;
  }

  // Split into sections
  let arr1 = version1.split('.').map(Number);
  let arr2 = version2.split('.').map(Number);
  let numSections = Math.max(arr1.length, arr2.length);

  // Compare sections of version1 with those of version2
  for (let i = 0; i < numSections; i += 1) {
    // Pad zeroes
    let firstNum = arr1[i] || 0;
    let secondNum = arr2[i] || 0;

    if (firstNum > secondNum) return 1;
    if (firstNum < secondNum) return -1;
  }

  return 0;
}

console.log(compareVersions('123', '145')); // -1
console.log(compareVersions('1', '1')); // 0
console.log(compareVersions('1.1', '1.0')); // 1
console.log(compareVersions('2.3.4', '2.3.5')); // -1
console.log(compareVersions('1.a', '1')); // null
console.log(compareVersions('.1', '1')); // null
console.log(compareVersions('1.', '2')); // null
console.log(compareVersions('1..0', '2.0')); // null
console.log(compareVersions('1.0', '1.0.0')); // 0
console.log(compareVersions('1.0.0', '1.1')); // -1
console.log(compareVersions('1.0', '1.0.5')); // -1

console.log(compareVersions('1.1.9000a', '1.1')); // null (can't contain 'a')
console.log(compareVersions('1.1.9000a', '1.1a')); // null (can't contain 'a')
console.log(compareVersions('1.1.9000', '1.1')); // 1 (9000 is greater than nothing)
console.log(compareVersions('1.5', '1.1')); // 1 (5 > 1)
console.log(compareVersions('1.5.6', '1.5.6')); // 0 (equal)
console.log(compareVersions('0.1.1.15', '0.1.2.15')); // -1 (1 < 2 in 3rd position)
