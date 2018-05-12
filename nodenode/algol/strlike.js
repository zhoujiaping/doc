/**
 * 字符串相似度(编辑距离)，比如用在DNA对比。
 * http://www.cnblogs.com/huangxincheng/archive/2012/11/11/2765633.html
 * 
 */
const {cache,time} = require('./aop');
function strlike(seqA,seqB){
    let lenA = seqA.length;
    let lenB = seqB.length;
    if(lenA==0 || lenB == 0){
        return lenA||lenB;
    }
    let subSeqA = seqA.substr(0,lenA-1);
    let subSeqB = seqB.substr(0,lenB-1);
    let tailA = seqA[lenA-1];
    let tailB = seqB[lenB-1];
    if(tailA == tailB){
        return strlike(subSeqA,subSeqB);
    }
    let m1 = strlike(subSeqA,seqB);
    let m2 = strlike(subSeqA,subSeqB);
    let m3 = strlike(seqA,subSeqB);
    return Math.min(m1,m2,m3)+1;
}
strlike = cache(strlike);
function main(){
    let seqA = 'ABCDE';
    let seqB = 'BC';
    let res = strlike(seqA,seqB);
    console.info(res);
}
time(main)();
console.info(cache.cache);
cache.clear();
const costTime = time.costTime;
console.info(`耗时：${costTime}ms`);