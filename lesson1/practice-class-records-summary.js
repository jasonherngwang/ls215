/* 
Class Records Summary

Calculate student final grades, and exam statistics

Algo
Method: Calculate avg exam score, from array of scores.
- Sum scores (using reduce) and divide by array length

Method: Sum exercise scores, from an array of scores.
- Sum scores (using reduce)

Method: Calculate weighted score, given the avg exam score and the exercises score total
- Weight avg exam score by 65%, and total exercise score by 35%.

Method: Lookup letter grade, from a single weighted score
- Use an if else statement

Method: Calculate exam stats, given an array of grades
- Use helper method to find avg score
- Use Math methods to find min and max.

*/

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

const EXAM_WEIGHT = 0.65;
const EXERCISES_WEIGHT = 0.35;

function sumGrades(array) {
  return array.reduce((sum, grade) => sum + grade);
}

function averageGrades(array) {
  return sumGrades(array) / array.length;
}

function weightGrades(examAvg, exerciseSum) {
  return Math.round(examAvg * EXAM_WEIGHT + exerciseSum * EXERCISES_WEIGHT);
}

function lookupLetterGrade(grade) {
  if (grade >= 93) {
    return 'A';
  } else if (grade >= 85) {
    return 'B';
  } else if (grade >= 77) {
    return 'C';
  } else if (grade >= 69) {
    return 'D';
  } else if (grade >= 60) {
    return 'E';
  } else {
    return 'F';
  }
}

// console.log(sumOfGrades([90, 50, 88, 100, 50]));
// console.log(averageOfGrades([90, 50, 88, 100, 50]));
// console.log(weightedGrade(84, 75));
// console.log(lookupLetterGrade(87));

function transpose(matrixArray) {
  return matrixArray[0].map((_, colIndex) =>
    matrixArray.map((row) => row[colIndex])
  );
}

function generateClassRecordSummary(scores) {
  const scoreData = Object.values(scores).map(({ scores }) => scores);

  const studentGrades = scoreData.map((scores) => {
    const examAvg = averageGrades(scores.exams);
    const exerciseSum = sumGrades(scores.exercises);
    const numberGrade = weightGrades(examAvg, exerciseSum);
    const letterGrade = lookupLetterGrade(numberGrade);
    return `${numberGrade} (${letterGrade})`;
  });

  const examData = scoreData.map((scores) => scores.exams);
  const exams = transpose(examData).map((examScores) => {
    return {
      average: averageGrades(examScores),
      minimum: Math.min(...examScores),
      maximum: Math.max(...examScores),
    };
  });

  return { studentGrades, exams };
}

console.log(generateClassRecordSummary(studentScores));

// returns:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }
