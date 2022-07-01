let str = 'cast';
if (str.match(/s/)) {
  console.log("matched 's'");
}

console.log('BlacK'.match(/K/));
console.log('perch'.match(/h/i));
console.log('golf'.match(/h/i));
console.log('snapdragon'.match(/dragon/));
let fruitRegex = '(banana|orange|apple|strawberry)';
console.log('pineapples'.match(fruitRegex));
console.log('blackberry'.match(/(blue|black)berry/));
