// 8. Reduce nâng cao – thống kê tuổi
const ages2 = [12, 15, 19, 22, 33, 17, 20, 14, 18];

const stats = ages2.reduce(
  (acc, age) => {
    acc.total += age;
    acc.min = age < acc.min ? age : acc.min;
    acc.max = age > acc.max ? age : acc.max;
    if (age >= 13 && age <= 19) acc.buckets.teen++;
    if (age >= 20) acc.buckets.adult++;
    return acc;
  },
  {
    total: 0,
    min: Infinity,
    max: -Infinity,
    buckets: { teen: 0, adult: 0 }
  }
);

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log(`Buckets: { teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`);