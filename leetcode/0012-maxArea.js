/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let p = 0,q = height.length-1
    let max = 0
    let curr = 0
    while(p<q){
        curr = Math.min(height[p],height[q])*(q-p)
        max = max<curr?curr:max
        if(height[p]<height[q]){
            p++
        }else{
            q--
        }
    }
    return max
};
console.info(maxArea([1,8,6,2,5,4,8,3,7]))
console.info(maxArea([1,2,1]))