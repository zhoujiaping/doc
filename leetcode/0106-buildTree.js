/**106. 从中序与后序遍历序列构造二叉树
根据一棵树的中序遍历与后序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
通过次数51,019提交次数73,303
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
	if(postorder.length==0)return null
	let rootVal = postorder.pop()
	let left = [],right = [],p = left
	for(let i=0;i<inorder.length;i++){
		if(inorder[i]==rootVal)p=right
		else p.push(inorder[i])
	}
	return {
		val:rootVal,
		left:buildTree(left,postorder.slice(0,left.length)),
		right:buildTree(right,postorder.slice(left.length))
	}
};
console.info(JSON.stringify(buildTree([9,3,15,20,7],[9,15,7,20,3]),true,2))