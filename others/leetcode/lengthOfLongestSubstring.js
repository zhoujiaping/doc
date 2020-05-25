/*
https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/

*/
var lengthOfLongestSubstring = function(s) {
	let dict = {};
	let begin = 0;
	let max = 0;
	for(let j = 0;j<s.length;j++){
		let letter = s[j];
		let index = dict[letter];
		if(index!=null){
			if(index>=begin){
				max = Math.max(max,j-begin);
				begin = index+1;
			}
		}
		dict[letter]=j;
	} 
	max = Math.max(max,s.length-begin);
	return max;
}
const f1 = chs =>{
    if(chs.length<2)return chs
    //not contains chs[0]
    const chs1 = f1(chs.slice(1))
    //contains chs[0]
    const chs2 = f2([],chs)
    if(chs1.length>chs2.length){
        return chs1
    }
    return chs2
}
const f2 = (acc,chs) =>{
    if(chs.length==0)return acc
    const [head,...tail] = chs
    const i = tail.indexOf(head)
    if(i<0){
        return f2(acc.concat([head]),tail)
    }
    return f2(acc.concat([head]),tail.slice(0,i))
}
lengthOfLongestSubstring = s=>f1([...s]).join('')
let s = 'ohomm';
console.info(lengthOfLongestSubstring(s));

	

