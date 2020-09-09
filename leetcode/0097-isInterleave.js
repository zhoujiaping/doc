/**
97. 交错字符串
给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。

示例 1：

输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出：true
示例 2：

输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出：false
通过次数35,504提交次数78,355
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 这题也可以用dp
 */
var isInterleave = function(s1, s2, s3,i1=0,i2=0,i3=0) {
    let cache = {}
    return isInterleave0(0,0,0)
    function isInterleave0(i1=0,i2=0,i3=0) {
        let key = [i1,i2,i3].join(',')
        if(cache[key] != null){
            return cache[key]
        }
        if(s3.length-i3!=s1.length-i1+s2.length-i2)return false
        while(i3<s3.length){
            if(s3[i3] == s1[i1]){
                if(s3[i3] == s2[i2]){
                    return cache[key] = isInterleave0(i1,i2+1,i3+1)||isInterleave0(i1+1,i2,i3+1)
                }else{
                    i1++
                }
            }else if(s3[i3] == s2[i2]){
                i2++
            }else{
                return cache[key] = false
            }
            i3++
        }
        return cache[key] = i1==s1.length&&i2==s2.length
    };
};
isInterleave2 = function(s1, s2, s3) {
    let n1= s1.length
    let n2 = s2.length
    if (n1+n2!=s3.length) return false

    let dp = Array.from(new Array(n1+1), () => new Array(n2+1))
    dp[0][0] = true
    // 初始化
    for(let i=1;i<=n1;i++) {
        dp[i][0] = dp[i-1][0] && s1[i-1] == s3[i-1]
    }
    for(let i=1;i<=n2;i++) {
        dp[0][i] = dp[0][i-1] && s2[i-1] == s3[i-1]
    }

    for(let i =1;i<=n1;i++) {
        for(let j=1;j<=n2;j++) {
            dp[i][j] = dp[i-1][j] && s1[i-1] == s3[i-1+j] || dp[i][j-1] && s2[j-1] ==s3[i+j-1]
        }
    }

    // s1的前i项，当前项就是 s1[i-1]
    return dp[n1][n2]
};
let begin = new Date().getTime()
let s1 = 'aabcc',s2 = 'dbbca',s3 = 'aadbbcbcac'
console.info(isInterleave(s1,s2,s3))
let end = new Date().getTime()
console.info(end-begin)