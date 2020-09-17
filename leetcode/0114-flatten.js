/**
114. 二叉树展开为链表
给定一个二叉树，原地将它展开为一个单链表。

例如，给定二叉树

    1
   / \
  2   5
 / \   \
3   4   6
将其展开为：
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
通过次数82,220提交次数115,668
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 先序遍历
 */
var flatten = function(root) {
    if(root==null)return null
    let arr = toArray(root)
	for(let i=0;i<arr.length-1;i++){
		arr[i].left = null
		arr[i].right = arr[i+1]
	}
	return arr[0]
};
function toArray(root) {
    if(root==null)return []
    return [root].concat(toArray(root.left)).concat(toArray(root.right))
};
//空间复杂度优化
flatten = function(root) {
    if(root==null)return null
	let leftList = flatten(root.left)
	let rightList = flatten(root.right)
    root.left = null
    let last=root
    if(leftList)last.right = leftList.head,last = leftList.last
    if(rightList)last.right = rightList.head, last = rightList.last
	return {head:root,last:last}
};