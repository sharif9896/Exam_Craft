const arr = [20,30,40,50,50,50,60,60,70,80,90,100];
const unique = arr => [...new Set(arr)];
const uniqueArr = unique(arr);
console.log(uniqueArr);

const str = 'RAYAN';
const revstr = str.split('').reverse().join('');
console.log(revstr)

const maxval = Math.max(...arr);
const minval = Math.min(...arr);
console.log("MAX : ", maxval,  "MIN : ", minval);

const prodmax = uniqueArr.sort(
    function(a, b){
        return b - a;
    }
);
const max_first = prodmax[0];
const max_second = prodmax[1];
console.log(max_first);
console.log(max_second);
const pro = max_first * max_second;
console.log("The product of first two maximum number", pro)
// console.log(arr);