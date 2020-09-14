/**
5. 最长回文子串
难度中等
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：
输入: "cbbd"
输出: "bb"
通过次数371,438提交次数1,167,542
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
//方法三，动态规划  p(i,j)为回文串的必要条件是p(i-1,j-1)为回文串并且s[i]==s[j],即状态转移方程。
//边界条件 1、p(i,i)=true  2、p(i,i+1)=s[i]==s[i+1] 
//特别要注意的是遍历的顺序,一定要按子串长度遍历
longestPalindrome0 = chs=>{
	if(chs.length<2)return chs
	let p = chs.map(_=>[])
	//console.info(p)
	let i4max=0,j4max=-1
	let j = 0//子串结束位置
	//枚举子串长度
	for(let len = 1;len<=chs.length;len++){
		//枚举子串起始位置
		for(let i=0;i<chs.length;i++){
			j = i+len-1
			if(j>=chs.length){
				break
			}
			if(i==j){
				p[i][j] = true
			}else if(i+1==j){
				p[i][j] = chs[i]==chs[j]
			}else if(p[i+1][j-1] && chs[i]==chs[j]){
				p[i][j] = true
			}else{
				p[i][j] = false
			}
			if(p[i][j] && j4max-i4max < j-i){
				i4max = i,j4max=j
			}
		}
	}
	return chs.slice(i4max,j4max+1)
}
longestPalindrome = s=>longestPalindrome0([...s]).join('')
longestPalindrome = s=>{
	let from=s.length,to=-1
	let dp = [...s].map(it=>[])
	for(let i=0;i<s.length;i++){
		for(let j=s.length-1;j>=i;j--){
			if(f(i,j) && j-i>to-from){
				to = j,from = i
			}
		}
	}
	function f(i,j){
		if(dp[i][j]!=null)return dp[i][j]
		if(i==j)return dp[i][j]=true
		if(i+1==j)return dp[i][j]=s[i]==s[j]
		if(s[i]!=s[j])return dp[i][j]=false
		return dp[i][j]=f(i+1,j-1)
	}
	return s.substring(from,to+1)
}
let s = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
console.info(longestPalindrome(s))
