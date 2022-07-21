/*
Problem
Write a function `doubler` that doubles every value in an array.

Inputs: 1 array of elements
Outputs: 1 new array with the elements from the input array doubled

Rules, Requirements, Definitions

Data Type Handling
- The array can contain mixed data types.
doubler([1, '2', [3], {4: 4}]) // [2, '22', [3], [3], {4: 4}, {4: 4}]

- Number elements (integers, floats) are multiplied by 2.
doublet

- Special numbers (NaN, Infinity, -Infinity) remain unchanged.
- String elements are concatenated with themselves.
  - Empty strings remain as ''.
- Arrays and Objects are duplicated (1 element -> 2 elements) by reference.
  - Both references point to the same object.
  - Do not shallow copy the object.
  - Nested arrays and objects are treated normally.
- null, undefined remain unchanged.
- No special handling for duplicates.

Array-Specific
- Non-element properties (e.g. '-1') remain unchanged.
- Sparse arrays become dense arrays (no missing elements).

Argument Handling
- Don't mutate input array.
- If 0 arguments passed, output "Invalid Input".
- If >1 arguments passed, ignore all but first argument.
- If argument is not an array
  - If string, treat as array of characters.
  - If non-negative integer, treats as array of digit numbers.
  - If object, treat as array of property values (exclude keys).
  - If regex, date, output error message.


Examples, Test Cases, Edge Cases
doubler()

Data Structure


Algorithm

*/
