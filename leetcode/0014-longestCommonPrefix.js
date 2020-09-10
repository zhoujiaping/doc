/**
14. 最长公共前缀
难度简单
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。
示例 1:
输入: ["flower","flow","flight"]
输出: "fl"
示例 2:
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:
所有输入只包含小写字母 a-z 。
通过次数354,752提交次数916,008
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {   
    if(strs.length==0)return ''   
    if(strs.length==1)return strs[0]
    //j：第二维数组的下标，即当前比较的列 
    //x：当前字符 
    let j=0,x=''
    while(true){
        x = strs[0][j]
        for(let i=1;i<strs.length;i++){
            if(strs[i].length<j){
                return strs[0].slice(0,j)
            }
            if(i!=0 && x !== strs[i][j]){
                return strs[0].slice(0,j)
            }
            x = strs[i][j]
        }
        j++
    }
};
console.info(longestCommonPrefix(['aaa','acbdd','abc']))