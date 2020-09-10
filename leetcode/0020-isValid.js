/**
20. 有效的括号
难度简单
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。
示例 1:
输入: "()"
输出: true
示例 2:
输入: "()[]{}"
输出: true
示例 3:
输入: "(]"
输出: false
示例 4:
输入: "([)]"
输出: false
示例 5:
输入: "{[]}"
输出: true
通过次数404,516提交次数941,250
 * @param {string} s
 * @return {boolean}
 下面这个算法是看别的写的，代码非常简洁，思路非常清晰，除了性能差一点，哈哈
 */
var isValid = function(s) {
    let len = s.length+1
    while(len != s.length){
        len = s.length
        s = s.replace("()","")
        s = s.replace("[]","")
        s = s.replace("{}","")
    }
    return s===''
};
//当然明眼人一看就知道这题考的是栈的应用
const map = new Map()
map.set('(',')')
map.set('[',']')
map.set('{','}')
var isValid = s=>{
	//加不加这两个判断性能几乎一样
    if(s==='')return true
    if(s.length&1)return false
	let stack = []
	let top
	for(let i=0;i<s.length;i++){
			if(map.has(s[i])){
				stack.push(s[i])
			}else if(stack.length==0){
				return false
			}else if(map.get(stack.pop())!==s[i]){
				return false
			}
	}
	return stack.length === 0
}