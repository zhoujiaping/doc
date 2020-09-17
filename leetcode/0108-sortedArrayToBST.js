/**
108. 将有序数组转换为二叉搜索树
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
通过次数114,096提交次数153,910
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums,from=0,to=nums.length-1) {
	if(from>to)return null
	else if(from==to)return {val:nums[from],left:null,to:null}
	let mid = (from+to+1)/2|0
	return {
		val:nums[mid],
		left:sortedArrayToBST(nums,from,mid-1),
		right:sortedArrayToBST(nums,mid+1,to)
	}
};
function toArray(root){
    let vals = []
    if(root!=null){
        vals.push(...toArray(root.left))
        vals.push(root)
        vals.push(...toArray(root.right))
    }
    return vals
}
console.info(toArray(sortedArrayToBST([-10,-3,0,5,9])).map(it=>it.val))