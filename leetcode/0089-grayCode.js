/**
89. 格雷编码
格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。
格雷编码序列必须以 0 开头。
示例 1:
输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2
对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
示例 2:

输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
通过次数32,928提交次数47,841
 * @param {number} n
 * @return {number[]}
 回溯 该算法会很容易出现递归深度限制问题
 */
var grayCode = function(n) {
	let ans = [0],len=1<<n,set = new Set([0])
	next()
	return ans
	function next(){
		if(ans.length==len)return true
		let code
		for(let i=0;i<n;i++){
			code = ans[ans.length-1]^(1<<i)
			if(!set.has(code)){
				ans.push(code)
				set.add(code)
				if(next(i))return true
				ans.pop()
				set.remove(code)
			}
		}
		return false
	}
};
/*利用数据特点
比如n=3
000
010
011
001
101
111
110
100
n=2时
00
01
11
01
观察特点可以知道，n阶格雷编码可以有n-1阶格雷编码得到。un
*/
grayCode = function(n) {
	if(n==0)return [0]
	let h = 1<<n-1
	let codes = grayCode(n-1)
	return codes.concat(codes.concat([]).reverse().map(it=>h+it))
};
console.info(grayCode(22))