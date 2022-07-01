/* 
map

map(callbackFn)
map((element, index, array) => { ... })

Return value of callback: Store in result array
Returns: New, transformed array
- Same length as input array
*/

function myMap(array, func) {
  let result = [];

  array.forEach((value) => {
    result.push(func(value));
  });

  return result;
}

let plusOne = (n) => n + 1;
console.log(myMap([1, 2, 3, 4], plusOne)); // [ 2, 3, 4, 5 ]
