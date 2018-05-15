/**
lowbit(x)是x的二进制表达式中最低位的1所对应的值。
x=x(n)x(n-1)x(n-2)...x(m)...x2x1共n位
假设x(m)位为1,小于m的位全为0。那么其反码为
y(n)y(n-1)...y(m)...y2y1，y(k)和x(k)互补
则y(m)为0,小于m的位全为1。所以其补码为
y(n)y(n-1)...1...00   y(m)变成了1,小于m位的全变成了0。
比如，6的二进制是110，所以lowbit(6)=2。
 */
function lowbit(i){
	return i&-i;
}
function test(){
	let lbs = [];
	for(let i=0;i<20;i++){
		console.info(i+'->'+lowbit(i));
	}
}
test();
module.exports = lowbit;