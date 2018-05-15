/**
 * 树状数组
 * 快速求数组的前n项和。
 * 树状数组的设计，s[i]设计为第i项（包括第i项）之前lowbit项的和。注意从第0项开始，但是第0项特殊处理。
 * 比如
 * s[1]=a[1]，第
 * s[2]=a[2]+a[1]
 * s[3]=a[3]
 * ...
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/05/2802858.html
 * 这个地址上的代码不全，而且数组下标不是从0开始，而且没有初始化s的代码。所以我对其进行了补充和修改。
 * */
const lowbit = require('./lowbit');
function createTreeArray(array){
	let arr = array;
	let s = [];
	if(arr.length>0){
		s.push(arr[0]);
	}
	for(let i=1;i<arr.length;i++){
		let lb = lowbit(i);
		s[i] = arr.slice(i-lb+1,i+1).reduce((prev,curr)=>prev+curr,0);
	}
	/*s.forEach((item,i)=>{
		console.info(`s[${i}]=${item}`);
	});*/
	return {
		updatedArray(i,newValue){
			let diff = newValue - arr[i];
			for(let j=i;j<arr.length;j+=lowbit(j)){
				s[j] = s[j]+diff;
			}
		},
		sum(i){
			let res = s[0];
			while(i>0){
				res+=s[i];
				i -= lowbit(i);
			}
			return res;
		},
		s
	};
}
function test(){
	let arr = [3,4,8,2,3,1,7];
	arr = [5,6];
	let bt = createTreeArray(arr);
	for(let i=0;i<bt.s.length;i++){
		console.info(`sum[${i}]=${bt.sum(i)}`);
	}
	bt.updatedArray(3,7);
	console.info('after update ...');
	for(let i=0;i<bt.s.length;i++){
		console.info(`sum[${i}]=${bt.sum(i)}`);
	}
}
test();
module.exports = createTreeArray;