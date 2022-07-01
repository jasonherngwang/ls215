/* 
reduce

reduce(callbackFn, initialValue)
reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)

Return value of callback: Accumulator value to be used as previousValue in next callback invocation
Returns: Single value
*/

function myReduce(array, func, initial) {
  let result;
  let startIndex;

  if (initial === undefined) {
    result = array[0];
    startIndex = 1;
  } else {
    result = initial;
    startIndex = 0;
  }

  array.slice(startIndex).forEach((value) => {
    result = func(result, value);
  });

  return result;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest)); // 1
console.log(myReduce([5, 12, 15, 1, 6], smallest, 0)); // 0
console.log(myReduce([5], sum)); // 5
console.log(myReduce([5], sum, 10)); // 15
console.log(myReduce([5, 12, 15, 1, 6], sum)); // 39
console.log(myReduce([5, 12, 15, 1, 6], sum, 10)); // 49
