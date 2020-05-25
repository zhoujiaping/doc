/**
* @author sirenia
* @date 2020-05-04
* 中缀表达式转后缀表达式
* 假设tokens中有'+','-','*','/','(',')',其它都当做标识符/变量名
例如 中缀表达式为 a+b*c+(d*e+f)*g
对应的后缀表达式为 abc*+de*f+g*+
TODO 支持一元操作符和多元操作符,支持左结合和右结合,支持前/中/后缀操作符,支持前/中缀操作符转中/前缀操作符,支持函数调用,支持lambda表达式...
*/
//返回栈顶元素,但是不删除栈顶元素
Array.prototype.peek = function(){
    if(this.length==0){
        throw new Error("array is empty,it can not be peek")
    }
    return this[this.length-1]
}
//将数组扁平化
Array.prototype.flatten = function(){
    let flattened = []
    this.forEach(item=>{
        if(Array.isArray(item)){
            Array.prototype.push.apply(flattened,item.flatten())
        }else{
            flattened.push(item)
        }
    })
    return flattened
}
//优先级,这里取值参考haskell里面定义的指
const priorities = {
    '+':6,
    '-':6,
    '*':7,
    '/':7,
    '(':-1
}
const midExpToSuffixExp = (tokens)=>{
    let operandStack = []
    let operateStack = []
    let opHandler = token => {
        if(operateStack.length==0){
           operateStack.push(token)
           return
        }
        let prevOp = operateStack.peek()
        //如果新的操作符优先级比栈顶操作符的优先级低(或相等),那么执行计算.
        //将<=换成<,则实现了操作符的右结合性
        if(priorities[token] <= priorities[prevOp]){
            //取操作数的个数,由操作符,则实现了多元操作符
            let secondNum = operandStack.pop()
            let firstNum = operandStack.pop()
            operandStack.push([firstNum,secondNum,operateStack.pop()])
            //这里发生了递归调用,浏览器中对js递归调用的层数有限制.
            //当然这里是尾递归,我们可以用lib.js中的tco函数对尾递归进行优化,使其执行时实际上按循环的方式执行,避免出现栈溢出的发生
            opHandler(token)
        }else{
            operateStack.push(token)
        }
    }
    let numHandler = token => {
        operandStack.push(token)
    }
    const opHandlers = {
        '+':opHandler,
        '-':opHandler,
        '*':opHandler,
        '/':opHandler,
        '(':token => {
            operateStack.push(token)
        },
        ')':token=>{//遇到右括号,则执行计算
            let op = operateStack.pop()
            while(op!='('){
                let secondNum = operandStack.pop()
                let firstNum = operandStack.pop()
                operandStack.push([firstNum,secondNum,op])
                op = operateStack.pop()
            }
        }
    }
    tokens.forEach(token=>{
        let handler = opHandlers[token]
        if(!handler){
            handler = numHandler
        }
        handler(token)
        console.info(`token=>${token}`)
        console.info(operandStack.flatten().join(' '))
        console.info(operateStack.flatten().join(' '))
    })
    //最后将剩余的操作符和操作数都执行计算
    while(operateStack.length>0){
        let secondNum = operandStack.pop()
        let firstNum = operandStack.pop()
        operandStack.push([firstNum,secondNum,operateStack.pop()])
    }
    let exp = operandStack.pop()
    //将嵌套数组扁平化,实际上这里的嵌套数组,是一颗表达式树
    return exp.flatten()
}
let test = ()=>{
    let tokens = ['a','+','b','*','c','+','(','d','*','e','+','f',')','*','g']
    console.info(tokens.join(' '))
    let exp = midExpToSuffixExp(tokens)
    console.info(exp.join(' '))
}
test()