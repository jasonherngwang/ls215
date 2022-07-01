/* 
We represent rectangles as Arrays with two elements: a height and a width.

Write a function that takes an Array of rectangles as an argument.
The function should return the total area covered by all the rectangles.

Algo
- Transform each element to a rectangle area, by multiplying the height & width.
- Sum all areas, by reducing the array, returning the sum of both arguments
  pass to the callback.
*/

let rectangles = [
  [3, 4],
  [6, 6],
  [1, 8],
  [9, 9],
  [2, 2],
];

console.log(totalArea(rectangles)); // 141

function totalArea(rectangles) {
  let areas = rectangles.map(([height, width]) => height * width);
  return areas.reduce((sum, area) => sum + area);
}

let rectanglesWithSquares = [
  [3, 4],
  [6, 6],
  [1, 8],
  [9, 9],
  [2, 2],
];
function totalSquareArea(rectangles) {
  let squares = rectangles.filter(([height, width]) => height === width);
  return totalArea(squares);
}
console.log(totalSquareArea(rectanglesWithSquares));
