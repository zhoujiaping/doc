/**
72. 编辑距离
给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
你可以对一个单词进行如下三种操作：
插入一个字符
删除一个字符
替换一个字符

示例 1：
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
通过次数80,053提交次数134,075
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 递归算法。如果不加缓存，时间复杂度太恐怖了，非常容易超时。
 既然是递归+缓存，那么就直接用dp
 */
let count = 0
let cache = {}//缓存可以优化，存下标而不是字符串
var minDistance = function(word1, word2) {
	let dist = cache[word1+','+word2]
	if(dist!=null){
		return dist
	}
	count++
	if(count>100000){
		throw new Error(`count is too large!`)
	}
	if(word1==''||word2==''){
		return cache[word1+','+word2] = Math.abs(word1.length-word2.length)
	}
	if(word1[0]==word2[0]){
		return cache[word1+','+word2] = minDistance(word1.substr(1),word2.substr(1))
	}else{
		return cache[word1+','+word2] = 1+Math.min(minDistance(word1,word2.substr(1)),
			minDistance(word1.substr(1),word2),
			minDistance(word1.substr(1),word2.substr(1)))
	}
};
//dp
var minDistance = (w1,w2)=>{
	//dp[i][j]表示w1前i个字符到w2前j个字符的最小编辑距离
	let dp = []
    dp[0] = [0]
    for(let i=0;i<w1.length;i++)dp[i+1]=[i+1]
    for(let i=0;i<w2.length;i++)dp[0][i+1]=[i+1]
	for(let i=1;i<=w1.length;i++){
		dp[i][0] = i
		for(let j=1;j<=w2.length;j++){
			if(w1[i-1]==w2[j-1])
				dp[i][j] = dp[i-1][j-1]
			else
				dp[i][j] = 1+Math.min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1])
		}
	}
	//console.info(dp)
	return dp[w1.length][w2.length]
}
let word1 = 'horse'
let word2 = 'ros'
word1 = "intention", word2 = "execution"
//word1 = "dinitrophenylhydrazine",word2 = "acetylphenylhydrazine"

//word1 = "enyh", word2 = "razie"

console.info(minDistance(word1,word2))
//console.info(count)