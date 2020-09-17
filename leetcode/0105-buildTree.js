/**
105. 从前序与中序遍历序列构造二叉树
根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
通过次数113,729提交次数167,392
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder,pre_i=0,pre_j=preorder.length-1,in_i=0,in_j=inorder.length-1) {
	if(pre_i>pre_j)return null
	else if(pre_i==pre_j)return {val:preorder[pre_i],left:null,right:null}
	let rootVal = preorder[pre_i]
	let pos = inorder.indexOf(rootVal)
	return {
		val:rootVal,
		left:buildTree(preorder,inorder,pre_i+1,pre_i+pos-in_i,in_i,pos-1),
		right:buildTree(preorder,inorder,pre_i+pos-in_i+1,pre_j,pos+1,in_j)
	}
};
/**
函数式。占用更多空间，消耗更多时间
*/
buildTree = function(preorder, inorder) {
	if(preorder.length==0)return null
	let rootVal = preorder[0]
	let left = [],right = [],p = left
	for(let i=0;i<inorder.length;i++){
		if(inorder[i]==rootVal)p=right
		else p.push(inorder[i])
	}
	return {
		val:rootVal,
		left:buildTree(preorder.slice(1,left.length+1),left),
		right:buildTree(preorder.slice(1+left.length),right)
	}
};
console.info(JSON.stringify(buildTree([3,9,20,15,7],[9,3,15,20,7]),true,2))