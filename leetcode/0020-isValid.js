/**
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