let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

let num = BigInt(input);

console.log(num[0]+num[1]);