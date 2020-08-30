/**
58. 最后一个单词的长度
给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。

 

示例:

输入: "Hello World"
输出: 5
通过次数119,390提交次数354,879
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
	let end = s.length-1,begin = -1
	for(let i=s.length-1;i>=0;i--){
		if(s[i]!=' '){
			end = i
			break
		}
	}
	
	for(let i=end;i>=0;i--){
		if(s[i]==' '){
			begin = i
			break
		}
	}
	return end - begin
};
lengthOfLastWord = s=>{
	let reg = /\s*(\w+\s+)*(\w+)\s*/igm
	let ret = reg.exec(s)
	//return ret
	return ret?ret[2]:0
}
lengthOfLastWord = function(s) {
  const arr = s.split(' ').filter(it => it !== '')
  if(arr.length > 0) {
      return arr[arr.length - 1].length
  }
  return 0
};
let s = "  Today is a nice day"
console.info(lengthOfLastWord(s))