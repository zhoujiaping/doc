/**
111. 二叉树的最小深度
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度  2.

通过次数135,160提交次数304,702
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 另一种方法：层序遍历找到第一个叶子节点
 */

var minDepth = function(root) {
	if(root==null)return 0
	return treeDepth(root)
};
//depth:root的深度,root不能为空
function treeDepth(root,depth=1) {
	if(!root.left && !root.right)return depth
	else if(root.left && !root.right) return treeDepth(root.left,depth+1)
	else if(!root.left && root.right) return treeDepth(root.right,depth+1)
	else return Math.min(treeDepth(root.left,depth+1),treeDepth(root.right,depth+1))
};