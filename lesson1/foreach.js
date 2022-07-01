"use strict";

/*
forEach

forEach(callbackFn)
forEach((element, index, array) => { ... })

Return value of callback: Doesn't use.
Returns: Primitive undefined
*/

function myForEach(array, func) {
  for (let i = 0; i < array.length; i += 1) {
    func(array[i], i, array); // i and array are ignored
  }
}

let min = Infinity;
let getMin = (value) => (min = value <= min ? value : min);
myForEach([4, 5, 12, 23, 3], getMin);
console.log(min); // 3
