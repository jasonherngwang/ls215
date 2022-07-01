/* 
Implement a function that determines whether a string has any character that appears more than once. The function should return true if, and only if, all characters in the string are unique. We should ignore multiple spaces and case differences; focus instead on the non-space characters without regard to case.

*/

function isAllUnique(string) {
  seen = {};
  let lowerCasedString = string.toLowerCase();

  for (let i = 0; i < lowerCasedString.length; i += 1) {
    if (lowerCasedString[i] === ' ') continue;
    if (seen[lowerCasedString[i]]) return false;
    seen[lowerCasedString[i]] = true;
  }

  return true;
}

console.log(isAllUnique('The quick brown fox jumped over a lazy dog')); // false
console.log(isAllUnique('123,456,789')); // false
console.log(isAllUnique('The big apple')); // false
console.log(isAllUnique('The big apPlE')); // false
console.log(isAllUnique('!@#$%^&*()')); // true
console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz')); // true
