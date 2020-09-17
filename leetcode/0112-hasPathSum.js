/**
112. 路径总和
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

通过次数135,407提交次数264,836
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
 * @param {number} sum
 * @return {boolean}
 dfs
 */
var hasPathSum = function(root, sum) {
	if(root==null)return false
	return hasPathSum0(root,sum)
};
function hasPathSum0(root, sum) {
	if(!root.left && !root.right)return root.val == sum
	let ans = false
	if(root.left)ans |= hasPathSum0(root.left,sum-root.val)
	if(root.right)ans |= hasPathSum0(root.right,sum-root.val)
	return ans
};

hasPathSum = (root,sum) => {
    if(root == null)  return false;
    if(root.left == null && root.right == null){
        return sum-root.val === 0
    }
    return hasPathSum(root.left,sum-root.val) || hasPathSum(root.right,sum-root.val)
}