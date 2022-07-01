// map to a new object with values doubled from myObject
function doubleObjectValues(object) {
  let objEntries = Object.entries(object);
  let objMapped = objEntries.map(([key, val]) => [key, val * 2]);

  return Object.fromEntries(objMapped);
}

console.log(doubleObjectValues({ a: 1, b: 2, c: 3 })); // { a: 2, b: 4, c: 6 }
