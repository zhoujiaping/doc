/**
8. 字符串转换整数 (atoi)
难度中等
请你来实现一个 atoi 函数，使其能将字符串转换成整数。
首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：
如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。
在任何情况下，若函数不能进行有效的转换时，请返回 0 。
提示：
本题中的空白字符只包括空格字符 ' ' 。
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
示例 1:
输入: "42"
输出: 42
示例 2:
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
示例 3:
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
示例 4:
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
示例 5:
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。
     因此返回 INT_MIN (−231) 。
通过次数204,634提交次数976,997
 * @param {string} str
 * @return {number}
 */
let max32 = 0x7fffffff
let min32 = -max32-1
var myAtoi = function(str) {
    let res = parseInt(str)
    if(isNaN(res)){
        return 0
    }else if(res<min32){
        return min32
    }else if(res>max32){
        return max32
    }else{
        return res
    }
};
/**
这题用js解是不是有点欺负人了？哈哈
看了官方的解法，用DFA（有限确定状态机），貌似没见过有人用DFA写业务代码的，除了我自己用过状态表（哈哈）。
作为练习，用DFA实现一下吧
*/
const newDfa=_=>{
    const dfa = {
        state:'start',
        ans:0,
        sign:1,
        consume:ch=>{
            let type = dfa.charType(ch)
            dfa.state = dfa.table[dfa.state][type]
            if(dfa.state=='number'){
                dfa.ans = dfa.ans*10+(+ch)
                if(dfa.sign==-1&&-dfa.ans<min32){
                    dfa.ans=-min32
                }else if(dfa.sign==1&&dfa.ans>max32){
                    dfa.ans = max32
                }
            }else if(dfa.state=='sign'&&ch=='-'){
                dfa.sign=-1
            }
        },
        charType:ch=>{
            if(ch==' '){
                return 0
            }else if(ch =='+' || ch=='-'){
                return 1
            }else if(ch>='0' && ch<='9'){
                return 2
            }else{
                return 3
            }
        },
        //各种状态接收某种类型字符后的状态
        table:{
            'start':['start','sign','number','end'],
            'sign':['end','end','number','end'],
            'number':['end','end','number','end'],
            'end':['end','end','end','end']
        }
    }
    return dfa
}

myAtoi = str=>{
    let chs = [...str]
    let dfa = newDfa()
    for(let i=0;i<chs.length;i++){
        dfa.consume(chs[i])
        if(dfa.state=='end'){
            break
        }
    }
    return dfa.sign*dfa.ans
}
//console.info(myAtoi('-123hello'))
//console.info(myAtoi("   -42"))
//console.info(myAtoi("-91283472332"))
//console.info(myAtoi("-2147483648"))
console.info(myAtoi("2147483648"))



