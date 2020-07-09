/**
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



