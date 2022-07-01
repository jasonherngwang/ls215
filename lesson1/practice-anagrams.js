/* 
Anagrams

Write a Function named anagram that takes two arguments: a word and an array of words. Your function should return an array that contains all the words from the array argument that are anagrams of the word argument. For example, given the word "listen" and an array of candidate words like "enlist", "google", "inlets", and "banana", the program should return an array that contains "enlist" and "inlets".

Algo: Main method
- Filter array to anagrams, and return

Algo: Helper method
Compare 2 strings to check if they are anagrams.

Algo 1: O(N log N + M log M)
- Split strings into arrays of chars.
- Sort arrays.
- Join chars back into strings.
- Compare the sorted strings.

Algo 2: O(N + M)
- Create a character count for first string
- Iterate through chars in 2nd string, decrementing the count from the first string
  - If the count is 1, delete the char
  - If char is not a key in the first string, return false
- If char count is empty, return true
  - Else return false
*/

"use strict";

// Algo 1
function areAnagrams(str1, str2) {
  const str1Sorted = [...str1].sort().join("");
  const str2Sorted = [...str2].sort().join("");
  return str1Sorted === str2Sorted;
}

// console.log(areAnagrams("abc", "cab"));
// console.log(areAnagrams("abcd", "cab"));

function tallyChars(string) {
  let counts = {};
  [...string].forEach((char) => {
    if (!counts[char]) {
      counts[char] = 0;
    }
    counts[char] += 1;
  });
  return counts;
}

// console.log(tallyChars("abcdefabcdaba"));

function areAnagrams2(str1, str2) {
  let str1Tally = tallyChars(str1);

  for (let i = 0; i < str2.length; i += 1) {
    let char = str2[i];
    if (!str1Tally[char]) {
      return false;
    } else if (str1Tally[char] === 1) {
      delete str1Tally[char];
    } else {
      str1Tally[char] -= 1;
    }
  }

  return Object.keys(str1Tally).length === 0;
}

// console.log(areAnagrams2("abc", "cab"));
// console.log(areAnagrams2("abcd", "cab"));

function anagram(word, list) {
  return list.filter((str) => areAnagrams(word, str));
}

console.log(anagram("listen", ["enlists", "google", "inlets", "banana"])); // [ "inlets" ]
console.log(anagram("listen", ["enlist", "google", "inlets", "banana"])); // [ "enlist", "inlets" ]

function anagram(word, list) {
  return list.filter((str) => areAnagrams2(word, str));
}

console.log(anagram("listen", ["enlists", "google", "inlets", "banana"])); // [ "inlets" ]
console.log(anagram("listen", ["enlist", "google", "inlets", "banana"])); // [ "enlist", "inlets" ]
