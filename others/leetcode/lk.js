
let num = '6345214';
let K = 4;
let res = [];
let max = 0;
function backtrace(k){
	let c = consumed(k);
	if(k==K){
		if(c.length==num.length){
			console.info(res);
			let ans = res.reduce((prev,curr)=>prev*curr,1);
			console.info(ans);
			max = Math.max(max,ans);
		}
		return;
	}
	for(let i=1;i<=num.length;i++){
		if(c.length+i<=num.length){
			res[k] = num.substr(c.length,i);
			backtrace(k+1);
		}
	}
}
function consumed(k){
	let used = '';
	for(let j=0;j<k;j++){
		used+=res[j];
	}
	return used;
}
backtrace(0);
console.info(max);