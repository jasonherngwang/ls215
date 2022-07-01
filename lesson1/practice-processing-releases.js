/* 
Write a function named processReleaseData that processes the following movie release data.

The Function should generate an Array of Objects that contain only the id and title key/value pairs. You may assume that id and title, when existing, is an integer greater than 0 and non-empty string respectively. Here are the rules:
- Keep only releases that have both id and title property present.
- Keep only the id and title data for each release.

Algo
- Filter: Check that id and title are keys of the object.
- Transform: Transform to objects with id and title data only.

*/

let newReleases = [
  {
    id: 70111470,
    title: "Die Hard",
    boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
  {
    title: "The Chamber",
    boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: "Fracture",
    boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
  {
    id: 0,
    title: "Movie",
  },
  {
    id: undefined,
    title: NaN,
  },
];

function processReleaseData(data) {
  let releasesWithIdTitle = data.filter((release) => {
    return (
      Object.keys(release).includes("id") &&
      Object.keys(release).includes("title")
    );
  });
  return releasesWithIdTitle.map(({ id, title }) => ({ id, title }));
}

console.log(processReleaseData(newReleases));

// should return:
// [
//   { id: 70111470, title: "Die Hard" },
//   { id: 675465, title: "Fracture" },
// ];
