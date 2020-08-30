/**
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？



例如，上图是一个7 x 3 的网格。有多少可能的路径？

 

示例 1:

输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
示例 2:

输入: m = 7, n = 3
输出: 28
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10 ^ 9
通过次数139,899提交次数225,772

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number} m
 * @param {number} n
 * @return {number}
 这不明显的dp么
 dp[i][j]表示从(i,j)到终点的路径数目
 dp[i][j] = dp[i][j+1]+dp[i+1][j]
 dp[i][j] = 1 如果 i>=m-1||j>=n-1
 dp[0][0]就是解
 */
var uniquePaths = function(m, n) {
	let dp = []
	for(let i=0;i<m;i++)dp[i]=[]
	return uniquePaths0(0,0)
	function uniquePaths0(i,j){
		if(dp[i][j]!=null){
			return dp[i][j]
		}
		if(i>=m-1 || j>=n-1)return dp[i][j]=1
		return dp[i][j] = uniquePaths0(i,j+1)+uniquePaths0(i+1,j)
	}
};
uniquePaths = function(m, n) {
	let dp = []
	for(let i=0;i<m;i++)dp[i]=[]
	for(let i=m-1;i>=0;i--){
		for(let j=n-1;j>=0;j--){
			if(i==m-1 || j==n-1)dp[i][j]=1
			else dp[i][j] = dp[i][j+1]+dp[i+1][j]
		}
	}
	//console.info(dp)
	return dp[0][0]
};
//空间优化 O(2n)
uniquePaths = function(m, n) {
	let prev = []
	for(let i=0;i<m;i++)prev[i]=1
	let curr = [...prev]
	for(let i=m-2;i>=0;i--){
		for(let j=n-2;j>=0;j--){
			curr[j] = curr[j+1]+prev[j]
		}
		prev = curr
	}
	//console.info(dp)
	return curr[0]
};
//继续优化 O(n)
uniquePaths = function(m, n) {
	let curr = []
	for(let i=0;i<m;i++)curr[i]=1
	for(let i=m-2;i>=0;i--){
		for(let j=n-2;j>=0;j--){
			curr[j] = curr[j+1]+curr[j]
		}
	}
	//console.info(dp)
	return curr[0]
};
//再继续优化 组合公式 C(n,m) = A(n,m)/m!
//A(n,m)=n!/(n-m)!
//C(n,m) = n!/(n-m)!/m!
uniquePaths2 = function(m, n) {
	return product(m+n-2)/product(m-1)/product(n-1)
};
let cache = new Map()
function product(x){
	let v = cache.get(x)
	if(v!=null)return v
	if(x==0)return 1
	v = x*product(x-1)
	cache.set(x,v)
	return v
}
let m = 7,n = 3
console.info(uniquePaths(m, n))