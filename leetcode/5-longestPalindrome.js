/**
 * 最长回文子串
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
	if(s.length<2)return s
	let chs = [...s]
	let curr,p,q = 0
	let max=[],currMax = []
	for(let i=0;i<chs.length;i++){
		curr = i
		//以i为中心
		p=i-1
		q=i+1
		currMax = [chs[i]]
		while(p>=0&&q<chs.length&&chs[p]==chs[q]){
			currMax.unshift(chs[p])
			currMax.push(chs[p])
			p--
			q++
		}
		if(currMax.length>max.length){
			max = currMax
		}
		//以i和i+1为中心
		currMax = []
		p=i,q=i+1
		while(p>=0&&q<chs.length&&chs[p]==chs[q]){
			currMax.unshift(chs[p])
			currMax.push(chs[p])
			p--
			q++
		}
		if(currMax.length>max.length){
			max = currMax
		}

	}
	return max.join('')
};
//方法二，递归。递归消耗资源太大了。。。而且明显里面有重复计算。这里可以用动态规划算法。
let maxs = {}
longestPalindrome0 = chs=>{
	if(chs.length<2)return chs
	let max1 = f1(chs)
	let max2 = f2(chs.slice(0,-1))
	let max3 = f3(chs.slice(1))
	let max4 = longestPalindrome0(chs.slice(1,-1))
	let max = max1.length>max2.length?max1:max2
	max = max.length>max3.length?max:max3
	max = max.length>max4.length?max:max4
	return max
}
//头尾元素都在最大回文串中
let f1 = chs=>{
	let p=0,q=chs.length-1
	while(p<q){
		if(chs[p]==chs[q]){
			p++,q--
		}else{
			return []
		}
	}
	return chs
}
//头元素在最大回文串中
let f2 = chs=>{
	if(chs.length<2){
		return chs
	}
	let max1 = f2(chs.slice(0,-1))
	let max2 = f1(chs)
	return max1.length>max2.length?max1:max2
}
//尾元素在最大回文串中
let f3 = chs=>{
	if(chs.length<2){
		return chs
	}
	let max1 = f3(chs.slice(1))
	let max2 = f1(chs)
	return max1.length>max2.length?max1:max2
}
longestPalindrome = s=>longestPalindrome0([...s]).join('')
//方法三，动态规划

console.info(longestPalindrome("cbbd"))
