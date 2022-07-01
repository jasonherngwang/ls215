/* 
Write a function that generates and returns an acronym from a string of words. 
For example, the function should return "PNG" for the string 
"Portable Network Graphics". Count compound words (words connected with a dash) 
as separate words.

Requirements
- Dashes and spaces are separators
- Acronyms have capital letters only

Algorithm
- Replace dashes with spaces
- Split into words, using space as the separator
  - Alternatively use regex to split based on space OR dash.
- Replace each with the upper case of its first letter
- Join letters into an acronym
*/

'use strict';

function acronym(string) {
  let words = string.split(/ |-/);
  let letters = words.map((word) => word[0].toUpperCase());
  return letters.join('');
}

console.log(acronym('Portable Network Graphics')); // "PNG"
console.log(acronym('First In, First Out')); // "FIFO"
console.log(acronym('PHP: HyperText Preprocessor')); // "PHP"
console.log(acronym('Complementary metal-oxide semiconductor')); // "CMOS"
console.log(acronym('Hyper-text Markup Language')); // "HTML"
