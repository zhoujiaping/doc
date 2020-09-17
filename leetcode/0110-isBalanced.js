/**
110. 平衡二叉树
给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:

给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
返回 false 。

通过次数134,317提交次数245,843
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
 * @return {boolean}
 */
var isBalanced = function(root) {
	return treeHeight(root)>-1
};
//h：预期root的高度
function treeHeight(root,h=1){
    if(root==null)return h-1
	let leftHeight = treeHeight(root.left,h+1)
	if(leftHeight<0)return -1
	let rightHeight = treeHeight(root.right,h+1)
	if(rightHeight<0)return -1
	if(Math.abs(leftHeight-rightHeight)>1)return -1
	return Math.max(leftHeight,rightHeight)
}
function toTree(arr){
    if(arr.length==0)return null
    let root = {val:arr[0]},queue = [root]
    let i=1
    while(i<arr.length){
        let head = queue.shift()
        if(arr[i]==null){
            head.left = null,i++
        }else{
            head.left = {val:arr[i++]}
            queue.push(head.left)
        }
        if(arr[i]==null){
            head.right = null,i++
        }else{
            head.right = {val:arr[i++]}
            queue.push(head.right)
        }
    }
    return root
}
let arr = [1,2,2,3,3,null,null,4,4]
arr = [1,2,3,4,null,null,5,6,null,null,7]//false
arr = [3,9,20,null,null,15,7]//true
console.info(isBalanced(toTree(arr)))
