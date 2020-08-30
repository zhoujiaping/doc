/**
验证给定的字符串是否可以解释为十进制数字。

例如:

"0" => true
" 0.1 " => true
"abc" => false
"1 a" => false
"2e10" => true
" -90e3   " => true
" 1e" => false
"e3" => false
" 6e-1" => true
" 99e2.5 " => false
"53.5e93" => true
" --6 " => false
"-+3" => false
"95a54e53" => false

说明: 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：

数字 0-9
指数 - "e"
正/负号 - "+"/"-"
小数点 - "."
当然，在输入中，这些字符的上下文也很重要。

更新于 2015-02-10:
C++函数的形式已经更新了。如果你仍然看见你的函数接收 const char * 类型的参数，请点击重载按钮重置你的代码。

通过次数17,995提交次数87,010

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {string} s
 * @return {boolean}
*/
let types = new Map()
'0123456789'.split('').forEach(it=>types.set(it,'d'))
types.set('-','s')
types.set('+','s')
types.set(' ',' ')
types.set('e','e')
types.set('.','.')
var isNumber = function(s) {
	let dfa = genDfa()
	let state = 'start'
	let type
	for(let i=0;i<s.length;i++){
		type = types.get(s[i])
		if(type==null){
			return false
		}
		if(dfa[state][type]!=null){
			state = dfa[state][type]
		}else{
			return false
		}
	}
	return state=='end'||dfa[state]['stop']!=null
};
function genDfa(){
	return {
		'start':{
			' ':'start',//b=>blank
			's':'sign',//s=>sign
			'd':'int',//d=>digit
			'.':'n-dot'
		},
		'sign':{
			'd':'int',
			'.':'n-dot'
		},
		'int':{
			'd':'int',
			'.':'dot',
			'e':'exp',
			' ':'end',
			'stop':'end'
		},
		'n-dot':{//前面没有数字的时候，直接出现小数点
			'd':'float'
		},
		'dot':{
			'e':'exp',
			'd':'float',
			' ':'end',
			'stop':'end'
		},
		'float':{
			'd':'float',
			'e':'exp',
			' ':'end',
			'stop':'end'
		},
		'exp':{
			's':'e-sign',
			'd':'e-int',
		},
		'e-sign':{
			'd':'e-int'
		},
		'e-int':{
			'd':'e-int',
			' ':'end',
			'stop':'end'
		},
		'end':{
			' ':'end'
		}
	}
}
let data = [
	["0",true],
	[" 0.1 ",true],
	["abc",false],
	["1 a",false],
	["2e10",true],
	[" -90e3   ",true],
	[" 1e" , false],
	["e3", false],
	[" 6e-1" , true],
	[" 99e2.5 " , false],
	["53.5e93" , true],
	[" --6 " ,false],
	["-+3" , false],
	["95a54e53", false],
	[".",false]
]
data.forEach((it,i)=>{
	console.info(`${i}=>${isNumber(it[0])}`)
})