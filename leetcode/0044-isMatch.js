/**
给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
两个字符串完全匹配才算匹配成功。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "*"
输出: true
解释: '*' 可以匹配任意字符串。
示例 3:

输入:
s = "cb"
p = "?a"
输出: false
解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
示例 4:

输入:
s = "adceb"
p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
示例 5:

输入:
s = "acdcb"
p = "a*c?b"
输出: false
通过次数50,098提交次数160,608

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/wildcard-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 * @param {string} s
 * @param {string} p
 * @return {boolean}
 https://leetcode-cn.com/problems/wildcard-matching/solution/tong-pei-fu-pi-pei-by-leetcode-solution/
 */
let isMatch = (s,p)=>{
	while((i=p.indexOf('**'))>-1){
		p = p.substring(0,i)+p.substring(i+1)
	}
	let ps= []
	let item = ''
	
	for(let i=0;i<p.length;i++){
		if(p[i]=='?'){
			if(item!=''){
				ps.push(item)
				item = ''
			}
			ps.push('?')
		}else if(p[i]=='*'){
			if(item!=''){
				ps.push(item)
				item = ''	
			}
			ps.push('*')
		}else{
			item+=p[i]
		}
	}
	if(item!=''){
		ps.push(item)
	}
	console.info(ps)
	p = ps
	//console.info(p)
	let count = 0
	let result = isMatch0(0,0)//s的起始下标，p的起始下标
	console.info(`count=${count}`)
	return result
	//用递归的思想，可以速度太慢了
	function isMatch0(si, pi){
		if(pi==p.length)return si==s.length
		let key = si+','+pi
		count++
		if(p[pi]=='?'){
			return cache[key] = si<s.length&&isMatch0(si+1,pi+1)
		}else if(p[pi]=='*'){
			for(let i=si;i<=s.length;i++){//如果反向遍历，则是正则的贪婪模式匹配.
				if(isMatch0(i,pi+1)){
					return true
				}
			}
			return false
		}else{
			return s.substr(si,p[pi].length)==p[pi]&&isMatch0(si+p[pi].length,pi+1)
		}
	}
}
isMatch = (s,p)=>{
	//s的前i个字符是否和p的前j个字符匹配,i和j都从1开始
	let dp = [...s].map(_=>[])
	dp.push([])
	isMatch0(s.length,p.length)
	return dp[s.length][p.length]
	function isMatch0(i,j){
		if(dp[i][j]!==undefined)return dp[i][j]
		if(i==0){
			if(j==0){
				dp[i][j]=true
			}else if(j==1){
				dp[i][j] = p[j-1] == '*'
			}else{
				dp[i][j] = p[j-1] == '*' && isMatch0(i,j-1)
			}
		}else{
			if(j==0){
				dp[i][j] = false	
			}else if(p[j-1]=='?'){
				dp[i][j] = isMatch0(i-1,j-1)
			}else if(p[j-1]=='*'){
				dp[i][j] = isMatch0(i,j-1) || isMatch0(i-1,j)
			}else{
				dp[i][j] = p[j-1]==s[i-1] && isMatch0(i-1,j-1)
			}
		}
		return dp[i][j]
	}
}

/*console.info(isMatch('abcd','abcd'))
console.info(isMatch('abcd','abc'))
console.info(isMatch('abc','abcd'))
console.info(isMatch('abcd','****d'))
console.info(isMatch('abcd','*'))
console.info(isMatch('','*'))
console.info(isMatch('','?'))*/
/*console.info(isMatch("aaaabaaaabbbbaabbbaabbaababbabbaaaababaaabbbbbbaabbbabababbaaabaabaaaaaabbaabbbbaababbababaabbbaababbbba",
	"*****b*aba***babaa*bbaba***a*aaba*b*aa**a*b**ba***a*a*"))*/
//console.info(isMatch("bbabab","**?a*"))
let s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
let p = "*aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*"
//console.info(isMatch(s,p))
s = "adceb"
p = "*a*b"
console.info(isMatch(s,p))

