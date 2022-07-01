/* 
Implement a function that takes a string as an argument and returns a new 
string that contains the original string in reverse.

Algorithm
- BREAK string into array of characters.
- PROCESS: Reverse array.
- COMBINE: Join back into string

*/

'use strict';

function reverse(string) {
  return [...string].reverse().join('');
}

console.log(reverse('hello')); // returns "olleh"
console.log(reverse('The quick brown fox')); // returns "xof nworb kciuq ehT"
