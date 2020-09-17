/**
107. 二叉树的层次遍历 II
给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其自底向上的层次遍历为：

[
  [15,7],
  [9,20],
  [3]
]
通过次数99,474提交次数147,190
*/

var levelOrder = function(root) {
	if(root==null)return []
	let queue1 = [],queue2 = [root],q
	let ans = [],layer,p
	while(queue2.length>0){
		queue1 = queue2,queue2 = []
		layer = []
		while(queue1.length>0){
			p = queue1.shift()
			if(p){
				layer.push(p.val)
				queue2.push(p.left,p.right)
			}
		}
		if(layer.length>0)ans.push(layer)
	}
	return ans
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = root=>levelOrder(root).reverse()