// 2. Rest parameter + reduce: sum, avg
function sum(...nums){
    return nums.reduce((acc, val) =>{
        let num = Number(val);
        return !isNaN(num) ? acc + num : acc;
    }, 0);
}

function avg(...nums){
    let validNums = nums.reduce((acc, val) =>{
        let num = Number(val);
        if(!isNaN(num)) {
            acc.push(num);
        }
        return acc;
    }, []);
    let total = validNums.reduce((acc, n) => acc + n, 0);
    return validNums.length ? (total / validNums.length).toFixed(2) : "0.00";
}

console.log(sum(1,2,3,4,5)); // 15
console.log(sum(1,2,'3',4,'5a')); // 10
console.log(avg(1,2,3,4,5)); // 3.00
console.log(avg(1,2,'3',4,'5a')); // 2.50
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 'x', 4));     // 5
console.log(avg(1, 2, 3, 4));    // 2.50
console.log(avg());              // 0.00