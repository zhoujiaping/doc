/**
84. 柱状图中最大的矩形
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。

示例:

输入: [2,1,5,6,2,3]
输出: 10
通过次数84,808提交次数203,836
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    //left[i]为第i个元素左边界（最左边大于等于height[i]的位置-1）
    let ans = 0,stack=[-1],left = [],right = []
    for(let i=0;i<heights.length;i++){
        while(stack.length>0&&heights[stack[stack.length-1]]>=heights[i]){
            stack.pop()
        }
        left[i] = stack[stack.length-1]
        stack.push(i)
    }
    stack = [heights.length]
    for(let i=heights.length-1;i>=0;i--){
        while(stack.length>0&&heights[stack[stack.length-1]]>=heights[i]){
            stack.pop()
        }
        right[i] = stack[stack.length-1]
        stack.push(i)
    }
    for(let i=0;i<heights.length;i++){
       ans = Math.max(ans, heights[i]*(right[i]-left[i]-1))
    }
    //console.info(left)
    //console.info(right)
    return ans
};
let heights = [2,1,5,6,2,3]
console.info(largestRectangleArea(heights))