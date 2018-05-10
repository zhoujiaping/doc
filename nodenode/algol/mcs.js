const {cache,time,compose} = require('./aop');
/**
 * 最长公共子序列的问题
 * http://www.cnblogs.com/huangxincheng/archive/2012/11/11/2764625.html
 * 
 */
function mcs(seqA,seqB){
	let lenA = seqA.length;
	let lenB = seqB.length;
	if(lenA==0 || lenB ==0){
		return '';
	}else{
		let tailA = seqA[lenA-1];
		let tailB = seqB[lenB-1];
		let subA = seqA.substr(0,lenA-1);
		let subB = seqB.substr(0,lenB-1);
		if(tailA===tailB){
			return mcs(subA,subB)+tailA;
		}else{
			let res1 = mcs(subA,seqB);
			let res2 = mcs(seqA,subB);
			return res1.length>res2.length?res1:res2;
		}
	}
}

//mcs = cache(mcs);
mcs = compose(mcs,cache,time);
function main(){
	let seqA = '<artifactId>mybatisplus-spring-boot-starter</artifactId>';
	let seqB = '<artifactId>spring-boot-starter-jdbc</artifactId>';
	let res = mcs(seqA,seqB);
	console.info(`最长公共子序列：${res}`);
}
time(main)();
cache.clear();
const costTime = time.costTime;
console.info(`耗时：${costTime}ms`);