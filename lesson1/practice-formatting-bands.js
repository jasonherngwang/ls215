/* 
Formatting Bands

Clean up data about music bands.
- The band countries are wrong: all the bands should have 'Canada' as the country.
- The band name should have all words capitalized.
- Remove all dots from the band names.

Expected output:
[
  { name: 'Sunset Rubdown', country: 'Canada', active: false },
  { name: 'Women', country: 'Canada', active: false },
  { name: 'A Silver Mt Zion', country: 'Canada', active: true },
]

Algo:
- Transform each band info
- Remove dots from name.
- Split name into words, using space as a delimiter.
- Transform each word into a capitalized word.
- Rejoin all words, using space as a separator.
- Change the value of the country property to 'Canada'.
- Create and return new object with cleaned data
*/

'use strict';

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function processBands(data) {
  return Object.entries(data).map(([_, { name, country, active }]) => {
    name = name
      .replaceAll('.', '')
      .split(' ')
      .map((word) => capitalize(word))
      .join(' ');
    country = 'Canada';
    return { name, country, active };
  });
}

console.log(processBands(bands));
