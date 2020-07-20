/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 能用indexOf？这是不是太简单了？
 用kmp算法？那这题就不应该是简单题了。
 但是让我写一个kmp算法的实现，不好意思，估计我也是到网上抄。
 那我就写个简单的实现吧
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};
strStr = (h,n)=>{
	if(n==='')return 0
	if(h==='')return -1
	let j
	for(let i=0;i<h.length-n.length+1;i++){
		j = 0
		while(j<n.length){
			if(h[i] !== n[j++]){
				break
			}
		}
		if(j===n.length){
			return i
		}
	}
	return -1
}