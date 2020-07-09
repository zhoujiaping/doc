/**
 * @param {number} num
 * @return {string}
 */
const table = [
    [null,'I','II','III','IV','V','VI','VII','VIII','IX'],
    [null,'X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
    [null,'C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],
    [null,'M','MM','MMM']
]
var intToRoman = function(num) {
    let romans = []
    let weight = 0
    while(num>0){
        romans.unshift(table[weight++][num%10])
        num = num/10|0
    }
    return romans.join('')
};