/**
109. 有序链表转换二叉搜索树
给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
通过次数60,603提交次数79,719
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
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
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    let nums = toArray(head).map(it=>it.val)
    return sortedArrayToBST(nums)
};
