/**
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

图片无法显示

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。

示例:

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6
通过次数135,100提交次数258,794

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 * @param {number[]} height
 * @return {number}
 分治思想
 */
var trap = function(height) {
	let maxLeft = [0],maxRight = []
	maxRight[height.length-1] = height.length-1
	for(let i=1;i<height.length;i++){
		maxLeft[i] = height[maxLeft[i-1]]<height[i]?i:maxLeft[i-1]
	}
	for(let i=height.length-2;i>=0;i--){
		maxRight[i] = height[maxRight[i+1]]<height[i]?i:maxRight[i+1]
	}
	//console.info(maxLeft)
	//console.info(maxRight)
	let max = maxLeft[height.length-1]
	let leftMax = maxLeft[max-1]
	let rightMax = maxRight[max+1]
	return size(leftMax,max)+size(max,rightMax)+trapLeft(leftMax)+trapRight(rightMax)
	//right is max item
	function trapLeft(right){
		if(right==null)return 0
		let max = maxLeft[right-1]
		return trapLeft(max)+size(max,right)
	}
	function trapRight(left){
		if(left==null)return 0
		let max = maxRight[left+1]
		return trapRight(max)+size(left,max)	
	}
	function size(left,right){
		if(left==null||right==null)return 0
		let s = Math.min(height[left],height[right])*(right-left-1)
		for(let i=left+1;i<right;i++){
			s -= height[i]
		}
		return s
	}
};


/**
每个柱子能存储的雨水等于 min(它左边的最高柱子,它右边的最高柱子)-它的高度。
然后累加起来就得到结果。
*/
let trap1 = h =>{
	let maxLeft = [],maxRight = [],ans=0
	maxLeft[-1]=0,maxRight[h.length] = 0
	for(let i=0;i<h.length;i++){
		maxLeft[i] = Math.max(maxLeft[i-1],h[i])
	}
	for(let i=h.length-1;i>=0;i--){
		maxRight[i] = Math.max(maxRight[i+1],h[i])	
	}
	for(let i=0;i<h.length;i++){
		ans+= Math.min(maxLeft[i],maxRight[i])-h[i]
	}
	return ans
}
//
/**
U型才能储水。碰到递增的元素就结算。
*/
Array.prototype.top = function(){
	return this[this.length-1]
}
Array.prototype.getAt = function(i){
	return this[i<0?this.length+i:i]
}
Array.prototype.setAt = function(i,v){
	this[i<0?this.length+i:i] = v
}
let trap2 = h=>{
	let stack = [],i=0,res = 0,top,height
	while(i<h.length){
		while(stack.length>0 && h[i]>h[stack.getAt(-1)]){
			top = stack.pop()
			if(stack.length==0)break
			height = Math.min(h[i],h[stack.getAt(-1)]) - h[top]
			res+=height*(i-stack.getAt(-1)-1)
		}
		stack.push(i++)
	}
	return res
}
let height = [0,1,0,2,1,0,1,3,2,1,2,1]
//height = [2,0,2]
console.info(trap(height))