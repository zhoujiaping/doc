/**
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