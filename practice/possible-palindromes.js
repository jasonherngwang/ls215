/*
https://medium.com/launch-school/javascript-weekly-using-a-structured-problem-solving-approach-fb9cce41ba5a

Problem
------------------------------------------
Write a program that takes a string as input and returns a count of how many 
words in the string can be rearranged to form palindromes. You may assume that 
input strings are at least 1 character in length and contain only alphabetic 
characters. You may ignore case for the purpose of assessing possible 
palindromes.

ex. Processing the string 'aaa bca Abab' should return the integer 2 because 
'aaa' is already a palindrome and 'Abab' can be rearranged to 'Abba', which is 
also a palindrome (case insensitive). Thus, two of the three words in the 
string can be made into palindromes.

Inputs: 1 string
- Length at least 1
- All alphabetic chars (upper and lower case).
- No spaces, punctuation.
Outputs: 1 number, the count of possible palindromes

Rules/Requirements
- Palindrome is same when read forward or backward (case-insentitive)

Clarifying Questions
- Palindrome has min length of 2?

Edge Cases
------------------------------------------
- String of length 1
- No possible palindromes in string
- Both upper and lower case characters are present
- String may contain palindromes already, or may require rearrangement

Examples, Test Cases
------------------------------------------
console.log(palindromCounter('abbAc C ddEf)); // 2 ('abcba', 'a')

Data Structure, Algorithm
------------------------------------------
Algorithm
- Initializer count to 0;
- Split string (by space) into array of words.
- Iterate over words
  - If string is palindrome or can be rearranged into one; increment counter
  - Else, do nothing
- Return counter

Helper method: Test if string is palindrome
Idea: If more than one count is odd, the string is not a palindrome
- Transform string to lowercase
- Initialize empty object to hold character counts
- Iterate through chars in string
  - If char not in counts, set it to have count 1.
  - If char in counts, delete it.
- If final object has only 1 object, the string is a palindrome.
*/

function isPalindrome(string) {
  let charCounts = {};
  for (let char of string.toLowerCase()) {
    if (!charCounts[char]) {
      charCounts[char] = 1;
    } else {
      delete charCounts[char];
    }
  }
  // console.log(charCounts);
  return Object.keys(charCounts).length <= 1;
}
// console.log(isPalindrome('a'));
// console.log(isPalindrome('Abc'));
// console.log(isPalindrome('abbAc'));
// console.log(isPalindrome('dog'));
// console.log(isPalindrome('dogdog'));
// console.log(isPalindrome('axlax'));

function palindromeCounter(string) {
  let counter = 0;
  let words = string.split(' ');
  words.forEach((word) => {
    if (isPalindrome(word)) counter += 1;
  });
  return counter;
}

console.log(palindromeCounter('a')); // 1 ('a')
console.log(palindromeCounter('ab')); // 0
console.log(palindromeCounter('Abc Def G')); // 1 ('g')
console.log(palindromeCounter('abbAc C ddEf')); // 2 ('abcba', 'c')
console.log(palindromeCounter('lmn opq rst')); // 0
console.log(palindromeCounter('AAA bAbbB')); // 2 ('aaa', 'bbabb')
