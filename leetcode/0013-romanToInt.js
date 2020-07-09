/**
 * @param {string} s
 * @return {number}
 */
const values = new Map()
values.set('I',1)
values.set('V',5)
values.set('X',10)
values.set('L',50)
values.set('C',100)
values.set('D',500)
values.set('M',1000)
var romanToInt = function(s) {
    //s = [...s]
    let num=0,prevValue=0
    for(let i=0;i<s.length;i++){
        value = values.get(s[i])
        num+=value
        if(prevValue<value){
            num=num-prevValue-prevValue
        }
        prevValue = value
    }
    return num
};