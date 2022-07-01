/* 
Interrogation

some

some(callbackFn)
some((element, index, array) => { ... } )

Return value of callback: Truthy or falsey value
Returns: true if truthy value is ever returned from ANY callback invocation. Else false.
- Short circuits when returning true

every

every(callbackFn)
every((element, index, array) => { ... } )

Return value of callback: Truthy or falsey value
Returns: true if truthy value is returned from ALL callback invocations.
*/

function myOwnSome(array, func) {
  for (let i = 0; i < array.length; i += 1) {
    if (func(array[i])) return true;
  }
  return false;
}

let isAString = (value) => typeof value === "string";
console.log(myOwnSome([1, NaN, "hello"], isAString)); // true
console.log(myOwnSome([42, undefined, []], isAString)); // false

function myOwnEvery(array, func) {
  for (let i = 0; i < array.length; i += 1) {
    if (!func(array[i])) return false;
  }
  return true;
}

console.log(myOwnEvery(["a", "a234", "1abc"], isAString)); // true
console.log(myOwnEvery(["a", "a234", "1abc", 777], isAString)); // false
