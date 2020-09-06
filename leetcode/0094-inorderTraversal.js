/**
94. 二叉树的中序遍历
给定一个二叉树，返回它的中序 遍历。

示例:

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

通过次数229,949提交次数316,226
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root,acc) {
	if(acc==null)acc=[]
	if(root==null)return acc
	inorderTraversal(root.left,acc)
	acc.push(root.val)
	inorderTraversal(root.right,acc)
	return acc
};