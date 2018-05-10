const {cache,time,compose} = require('./aop');
/**
 * 最长公共子序列的问题
 * http://www.cnblogs.com/huangxincheng/archive/2012/11/11/2764625.html
 * 求序列X={x0,x1,x2,....xi}
 * 与序列Y={y0,y1,y2,...yj}
 * 的最长公共子序列。
 * 公式：
 * f(i,j) = '' if(i==0 || j==0)
 * f(i,j) = f(i-1,j-1)+1 if(i>0 && j>0 && xi==yj)
 * f(i,j) = max(f(i-1,j),f(i,j-1)) if(i>0 && j>0 && xi!=yj)
 * 代码实现是比较简单的，最重要的是证明该公式。
 * 第一种情况，X序列的长度为0，或者Y序列的长度为0，那么最长公共子序列为''，这个太简单不需要证明。
 * 第二种情况，用反正法，假设f(i,j)>f(i-1,j-1)+1，即f(i-1,j-1)<f(i,j)-1。
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