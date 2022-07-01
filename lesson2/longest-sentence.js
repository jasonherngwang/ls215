/*
Problem
------------------------------------------
Write a program that determines the sentence with the most words, in some text.

Inputs: 1 string of text
Outputs: Log the longest sentence and its word count.

Rules/Requirements
- Sentences end with '.', '!', or '?'.
- A word is a contiguous sequence of characters that are NOT spaces or sentence
  ending characters.
- Sentences begin with a word character.

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------


Data Structure, Algorithm
------------------------------------------
Algorithm
- Split text into array of sentences
  - Separator: Any contiguous sequence of '.', '!', '?'
  - We only expect there to be one instance, but multiple instances, e.g. '!!!!'
    would count as a single separator.
  - Trim the end of the sentence to get rid of whitespace.
- Split each sentence into an array of words
  - There should be no sentence-ending characters left.
  - Separator: ' '
  - Commas and other punctuation are included in the word.
    - 'apple,', "shan't", and '--' are all considered words.

Algorithm using match
- Split text into array of sentences by using a global regex match which
  preserves punctuation.
  - Regex: /\w[^.!?]*[.!?]/gi
*/

'use strict';

let longText =
  'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

function longestSentence(text) {
  let sentences = text.match(/\w[^.!?]*?[.!?]+/gi);
  let longest = selectLongestSentence(sentences);

  console.log(longest.text);
  console.log(`The longest sentence has ${longest.wordCount} words.`);
}

function countWords(sentence) {
  return sentence.split(' ').length;
}

function selectLongestSentence(sentences) {
  let longest = {
    text: '',
    wordCount: 0,
  };

  // In case sentences is null or undefined
  if (!sentences) return longest;

  return sentences.reduce((longest, sentence) => {
    let wordCount = countWords(sentence);
    if (wordCount > longest.wordCount) {
      longest.text = sentence;
      longest.wordCount = wordCount;
    }
    return longest;
  }, longest);
}

longestSentence(longText);
longestSentence('Hello! Why? Goodbye');
longestSentence('');
longestSentence('I!');
longestSentence("What's up, 'Doc'?    The brown fox is superlative!");
longestSentence('aaaaaaaa. a b c.');
longestSentence(`     I yam what I yam! Hi there!`);

// console output
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.

// The longest sentence has 86 words.

// Assuming the last sentence is removed:

// longestSentence(longText);

// console output
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.

// The longest sentence has 30 words.
