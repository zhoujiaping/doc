//let max = Math.pow(2,53)//9007199254740992
var plusOne = function(digits) {
    digits[-1]=0
    let carry = 1,i=digits.length-1
    while(carry>0){
        digits[i] +=carry
        carry = digits[i]/10|0
        digits[i] %= 10
        i-- 
    }
    if(digits[-1]>0)digits.unshift(digits[-1])
    delete digits[-1]
    return digits
};
let digits = [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2]
digits = [1,2,3]
//digits = [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
console.info(plusOne(digits))