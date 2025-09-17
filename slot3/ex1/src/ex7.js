// 7. Spread vs. rest – bất biến & gộp mảng
const companies = [
  { name: "Alpha", category: "Finance", start: 1999, end: 2007 },
  { name: "Beta", category: "Tech", start: 2005, end: 2015 }
];

const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log(companies[0]);    // { name: "Alpha", category: "Finance", start: 1999, end: 2007 }
console.log(company0New);     // { name: "Alpha", category: "Finance", start: 2000, end: 2007 }

function concatAll(...arrays) {
  return [].concat(...arrays);
}
console.log(concatAll([1,2],[3],[4,5])); // [1, 2, 3, 4, 5]