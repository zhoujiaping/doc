/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
	let r = 0;
	let res = [];
	while(x!=0){
		r = x%10;
		//res = res*10+r;
        res.push(r);
		x = (x/10)|0;
	}
    res = res.reduce((prev,curr)=>prev*10+curr,0);
    return (res<-2147483648||res>2147483647)?0:res;
};
let x = -321;
let res = reverse(x);
console.info(res);