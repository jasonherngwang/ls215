/*
Problem
------------------------------------------
A collection of spelling blocks has two letters per block, as shown in this list:

B:O   X:K   D:Q   C:P   N:A
G:T   R:E   F:S   J:W   H:U
V:I   L:Y   Z:M

This limits the words you can spell with the blocks to only those words that do not use both letters from any given block. You can also only use each block once.

Write a function that takes a word string as an argument, and returns true if the word can be spelled using the set of blocks, or false otherwise. You can consider the letters to be case-insensitive when you apply the rules.

Inputs: 1 string, a word
- Can be upper or lowercase
- "Word string" means only letter characters (A-Z, a-z) will be in the string.
  - No punctuation, spaces, special characters
Outputs: 1 boolean, whether the word can be spelled using the blocks

Requirements
- Each block can only be used once in the word.
  - E.g. if the letter 'B' is seen twice in the string, return false
    If the letter 'B' is seen once, but 'O' is also seen, return false

Clarifying Questions
- The number of arguments will always be 1? Yes.
- The argument will always be string data type? Yes.
- Empty string possible? Yes.

Examples, Test Cases
------------------------------------------
Input: 'BATCH'
- Used blocks B:O, N:A, G:T, C:P, H:U => true

Input: 'BUTCH'
- Used blocks B:O, H:U, G:T, C:P, H:U (illegal) => false

Input: 'jest' => 'JEST'
- Used blocks J:W, R:E, F:S, G:T => true

Data Structure, Algorithm
------------------------------------------
Data Structure
- Use Object (as a constant) to store the spelling block data (uppercase letters)
  - Number of entries: 26  
  - Each block has 2 entries. For example, block B:O has:
    - Key: 'B', Value: 'O'
    - Key: 'O', Value: 'B'

Algorithm
- Copy the spelling block data, so we can mutate it.
- If the word contains any non-letter characters, it cannot be spelled using
  the blocks. Return false.
  - if (/[^a-z]/i.test(word)) return false;
- Upcase the word, since spelling block data object is uppercase.
- Iterate through the characters in the word.
  - Check if the character exists as a key in the blocks object, by attempting
    to access it.
      - If the returned value is not `undefined`, then the block is available
        to use.
        - Delete both object entries corresponding to the key, e.g. 'B', and its
          value, e.g. 'O'. Now both sides are no longer available.
      - If the returned value is `undefined`, the block has already been used
        and was deleted at some point in the past.
        - Return false.
- If the iteration completes without returning false, return true
*/

'use strict';

const BLOCKS = {
  B: 'O',
  X: 'K',
  D: 'Q',
  C: 'P',
  N: 'A',
  G: 'T',
  R: 'E',
  F: 'S',
  J: 'W',
  H: 'U',
  V: 'I',
  L: 'Y',
  Z: 'M',
  O: 'B',
  K: 'X',
  Q: 'D',
  P: 'C',
  A: 'N',
  T: 'G',
  E: 'R',
  S: 'F',
  W: 'J',
  U: 'H',
  I: 'V',
  Y: 'L',
  M: 'Z',
};

function isBlockWord(word) {
  let blocks = Object.assign({}, BLOCKS);

  for (let char of word.toUpperCase()) {
    let blockReverseChar = blocks[char];
    if (!blockReverseChar) return false;
    delete blocks[char];
    delete blocks[blockReverseChar];
  }

  return true;
}

// Typical test cases
console.log(isBlockWord('BATCH')); // true
console.log(isBlockWord('BaTcH')); // true (mixed case allowed)
console.log(isBlockWord('jest')); // true
console.log(isBlockWord('')); // true (empty string; no blocks used)

console.log(isBlockWord('BUTCH')); // false (U:H block reused)
console.log(isBlockWord('FAT CAT')); // false (reused blocks A and T)

console.log(isBlockWord('B A T C H')); // false (illegal characters present)
console.log(isBlockWord(' B.A T-C/H>')); // false
console.log(isBlockWord('-.+=?')); // false
