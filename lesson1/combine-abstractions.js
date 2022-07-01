let names = [
  "Heather",
  "Gisella",
  "Katsuki",
  "Hua",
  "Katy",
  "Kathleen",
  "Otakar",
];

// map
let initials = names.map((name) => name[0]);
console.log(initials);

// reduce
let initialCounts = initials.reduce((counts, initial) => {
  if (!Object.keys(counts).includes(initial)) counts[initial] = 0;
  counts[initial] += 1;
  return counts;
}, {});
console.log(initialCounts);

// reduce
let mostCommonInitial = Object.keys(initialCounts).reduce(
  (prevInitial, currentInitial) => {
    if (initialCounts[currentInitial] > initialCounts[prevInitial]) {
      return currentInitial;
    } else {
      return prevInitial;
    }
  }
);
console.log(mostCommonInitial);
