/*
Problem
------------------------------------------
Write a function that takes a string as an argument and returns true if the 
string contains properly balanced parentheses, false otherwise. Parentheses are 
properly balanced only when '(' and ')' occur in matching pairs, with each pair 
starting with '('.

Inputs: 1 string
Outputs: 1 boolean

Rules/Requirements
-

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------


Data Structure, Algorithm
------------------------------------------
Algorithm
- Create a hash table that pairs opening and closing parentheses/brackets/braces
  - Key is closing bracket. Value is opening bracket.
- Create a stack
- Traverse the characters in the string
  - If character is a key in the hash table, the table will provide the
    corresponding opening bracket.
    - Peek at the top of the stack. If it matches the opening brack, we have a
      match. Pop it from the stack.
    - If the bracket on the top of the stack is not the matching bracket, we
      have a mismatch. Return false.
  - If character is an opening bracket, push it on the stack.
- At the end of the traversal, if the stack is empty, return true
  - Else, return false

*/

'use strict';

const BRACKET_PAIRS = { ')': '(', ']': '[', '}': '{' };

function isBalanced(string) {
  let stack = [];

  for (let char of string) {
    let matchingBracket = BRACKET_PAIRS[char];

    if (BRACKET_PAIRS[char]) {
      let stackTop = stack[stack.length - 1];

      if (matchingBracket === stackTop) {
        stack.pop(); // Successful match
      } else {
        return false; // Mismatch
      }
    } else if (Object.values(BRACKET_PAIRS).includes(char)) {
      stack.push(char); // Add opening bracket to stack
    }
  }

  return stack.length === 0; // If all matched, stack should be empty.
}

console.log(isBalanced('What (is) this?')); // true
console.log(isBalanced('What is) this?')); // false
console.log(isBalanced('What (is this?')); // false
console.log(isBalanced('((What) (is this))?')); // true
console.log(isBalanced('((What)) (is this))?')); // false
console.log(isBalanced('Hey!')); // true
console.log(isBalanced(')Hey!(')); // false
console.log(isBalanced('What ((is))) up(')); // false
