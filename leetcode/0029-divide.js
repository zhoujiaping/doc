/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 TODO
 */
const max = 0x7fffffff
const min = -max-1
var divide = function(dividend, divisor) {
    let res = (dividend/divisor)
    if(res<min || res>max)return max
    return res|0
};
console.info(divide(-2147483648,-1))

let n1 = 10,n2 = 3
let sign = 1
if(n1<0 && n2 <0){
	n1= -n1,n2=-n2
}else if(n1<0 && n2>0){
	n1 = -n1
	sign = -1
}else if(n1>0 && n2<0){
	n2 = -n2
	sign = -1
}
let r = n1
let d = 0
while(r>=n2){
	d+=1
	r = r - n2
}
if(sign<0){
	d = -d
}
if(d<min || d>max)return max
console.info(d|0)