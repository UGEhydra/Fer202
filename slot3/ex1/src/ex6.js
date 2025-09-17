// 6. Sort + slice – doanh nghiệp theo năm kết thúc
const companies = [
  { name: "Alpha", category: "Finance", start: 1999, end: 2007 },
  { name: "Beta", category: "Tech", start: 2005, end: 2015 },
  { name: "Gamma", category: "Retail", start: 2001, end: 2003 },
  { name: "Delta", category: "Auto", start: 1995, end: 2005 },
  { name: "Epsilon", category: "Health", start: 2000, end: 2010 }
];

const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
const top3 = sortedCompanies.slice(0, 3);
top3.forEach(c => console.log(`${c.name} - ${c.end}`));
// Gamma - 2003
// Delta - 2005
// Alpha - 2007