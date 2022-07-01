/* 
sort

sort(compareFn)
sort((a, b) => { ... } )

Return value of callback:
- negative number: Sort a BEFORE b
- 0: No change to order
- positive number: Sort a AFTER b

Returns: Sorts array in-place. Returns reference to sorted array.
*/

let studentGrades = [
  { name: "StudentA", grade: 90.1 },
  { name: "StudentB", grade: 92 },
  { name: "StudentC", grade: 91.8 },
  { name: "StudentD", grade: 95.23 },
  { name: "StudentE", grade: 91.81 },
];

// Sort descending
function compareGrades(student1, student2) {
  if (student1.grade < student2.grade) {
    return 1;
  } else if (student1.grade > student2.grade) {
    return -1;
  } else {
    return 0;
  }
}

console.log(studentGrades.sort(compareGrades));
