/*
Problem
------------------------------------------
Sentiment Analysis uses lists of positive and negative words to determine if
the mood of some text is positive, negative, or neutral.

Sentiment score = # positive words - # negative words
- Positive number: positive sentiment
- 0: neutral
- Negative number: negative sentiment

Inputs:
- Some text
- Array of positive words
- Array of negative words
Outputs: 
- List and count of positive words
- List and count of negative words
- Sentiment: pos, neg, neutral

Rules/Requirements
- In the console output, words used multiple times are included.
- Words appear in the console output in the order they appear in the text.
- The word must stand alone. Adjacent punctutation and whitespace are allowed,
  but adjacent letters are not.
  - E.g. For the positive word 'noble', the text 'nobler' would NOT count as 
    a match. The text ' noble,' would count.

Clarifying Questions
- 

Examples, Test Cases
------------------------------------------


Data Structure, Algorithm
------------------------------------------
There are:
- P positive words in the array
- N negative words
- M words in the input string

Algorithm 1 - DOESN'T WORK since we need to list duplicates in order
instead of search for all instance at once.
- Iterate over the array of positive words
  - For each word, search the input string for all instances of the word
    - Can use match with global regex
  - Add the total number of positive words to a total
- Repeat for negative words
- Calculate the difference

Algorithm 2
- Split the input string into an array of words, using whitespace and 
  punctuation as the separator.
- Iterate over words in the array.
  - If current word is in the positive words array
    - Add 1 to the positive words total
    - Add the word to the array of positive words seen
  - Repeat with negative words
- Calculate the difference
*/

'use strict';

let textExcerpt =
  'To be or not to be-that is the question:\n' +
  "Whether 'tis nobler in the mind to suffer\n" +
  'The slings and arrows of outrageous fortune,\n' +
  'Or to take arms against a sea of troubles,\n' +
  'And, by opposing, end them. To die, to sleep-\n' +
  'No more-and by a sleep to say we end\n' +
  'The heartache and the thousand natural shocks\n' +
  "That flesh is heir to-'tis a consummation\n" +
  'Devoutly to be wished. To die, to sleep-\n' +
  "To sleep, perchance to dream. Aye, there's the rub,\n" +
  'For in that sleep of death what dreams may come,\n' +
  'When we have shuffled off this mortal coil,\n' +
  "Must give us pause. There's the respect\n" +
  'That makes calamity of so long life.\n' +
  'For who would bear the whips and scorns of time,\n' +
  "Th' oppressor's wrong, the proud man's contumely, [F: poor]\n" +
  'The pangs of despised love, the law’s delay, [F: disprized]\n' +
  'The insolence of office, and the spurns\n' +
  'That patient merit of the unworthy takes,\n' +
  'When he himself might his quietus make\n' +
  'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
  'To grunt and sweat under a weary life,\n' +
  'But that the dread of something after death,\n' +
  'The undiscovered country from whose bourn\n' +
  'No traveler returns, puzzles the will\n' +
  'And makes us rather bear those ills we have\n' +
  'Than fly to others that we know not of?\n' +
  'Thus conscience does make cowards of us all,\n' +
  'And thus the native hue of resolution\n' +
  "Is sicklied o'er with the pale cast of thought,\n" +
  'And enterprises of great pitch and moment, [F: pith]\n' +
  'With this regard their currents turn awry, [F: away]\n' +
  'And lose the name of action.-Soft you now,\n' +
  'The fair Ophelia.-Nymph, in thy orisons\n' +
  'Be all my sins remembered';

let positiveWords = [
  'fortune',
  'dream',
  'love',
  'respect',
  'patience',
  'devout',
  'noble',
  'resolution',
];
let negativeWords = [
  'die',
  'heartache',
  'death',
  'despise',
  'scorn',
  'weary',
  'trouble',
  'oppress',
];

// DOESN'T MEET QUESTION REQUIREMENTS
// function sentiment(text) {
//   let positiveWordCount = 0;
//   let negativeWordCount = 0;

//   let positiveWordsUsed = [];
//   let negativeWordsUsed = [];

//   positiveWords.forEach((word) => {
//     let regex = new RegExp(`[^a-z]${word}[^a-z]`, 'g');
//     let matches = text.match(regex);
//     if (matches) {
//       positiveWordCount += matches.length;
//       positiveWordsUsed.push(word);
//     }
//   });
//   negativeWords.forEach((word) => {
//     let regex = new RegExp(`[^a-z]${word}[^a-z]`, 'g');
//     let matches = text.match(regex);
//     if (matches) {
//       negativeWordCount += matches.length;
//       negativeWordsUsed.push(word);
//     }
//   });

//   let sentimentScore = positiveWordCount - negativeWordCount;
//   let sentiment = 'Neutral';
//   if (sentimentScore > 0) {
//     sentiment = 'Positive';
//   } else if (sentimentScore < 0) {
//     sentiment = 'Negative';
//   }

//   console.log(`There are ${positiveWordCount} positive words in the text.`);
//   console.log(`Positive sentiments: ${positiveWordsUsed.join(', ')}`);

//   console.log(`There are ${negativeWordCount} negative words in the text.`);
//   console.log(`Positive sentiments: ${negativeWordsUsed.join(', ')}`);

//   console.log(`The sentiment of the text is ${sentiment}.`);
// }

function sentiment(text) {
  let positiveWordCount = 0;
  let negativeWordCount = 0;
  let positiveWordsUsed = [];
  let negativeWordsUsed = [];

  // let words = text.toLowerCase().split(/[^a-z]+/);
  let words = text.toLowerCase().match(/[a-z']+/g);

  words.forEach((word) => {
    if (positiveWords.includes(word)) {
      positiveWordCount += 1;
      positiveWordsUsed.push(word);
    } else if (negativeWords.includes(word)) {
      negativeWordCount += 1;
      negativeWordsUsed.push(word);
    }
  });

  let sentimentScore = positiveWordCount - negativeWordCount;
  let sentiment = 'Neutral';
  if (sentimentScore > 0) {
    sentiment = 'Positive';
  } else if (sentimentScore < 0) {
    sentiment = 'Negative';
  }

  console.log(`There are ${positiveWordCount} positive words in the text.`);
  console.log(`Positive sentiments: ${positiveWordsUsed.join(', ')}`);

  console.log(`There are ${negativeWordCount} negative words in the text.`);
  console.log(`Positive sentiments: ${negativeWordsUsed.join(', ')}`);

  console.log(`The sentiment of the text is ${sentiment}.`);
}

sentiment(textExcerpt);

// console output

// There are 5 positive words in the text.
// Positive sentiments: fortune, dream, respect, love, resolution

// There are 6 negative words in the text.
// Negative sentiments: die, heartache, die, death, weary, death

// The sentiment of the text is Negative.
