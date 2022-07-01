/* 
filter

filter(callbackFn), a predicate method
filter((element, index, array) => { ... } )

Return value of callback: If truthy, keep. If falsey, reject.
Returns: New, filtered array
*/

function myFilter(array, func) {
  let result = [];

  array.forEach((value) => {
    if (func(value)) result.push(value);
  });

  return result;
}

// a^2 + b^2 = c^2
let isPythagoreanTriple = function (triple) {
  return (
    Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2)
  );
};

console.log(
  myFilter(
    [
      { a: 3, b: 4, c: 5 },
      { a: 5, b: 12, c: 13 },
      { a: 1, b: 2, c: 3 },
    ],
    isPythagoreanTriple
  )
);

// returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]
