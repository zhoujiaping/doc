/**
113. 路径总和 II
给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

说明: 叶子节点是指没有子节点的节点。

示例:
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回:

[
   [5,4,11,2],
   [5,8,4,5]
]
通过次数73,216提交次数120,121
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
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
	if(root == null)  return []
    if(root.left == null && root.right == null){
        return sum-root.val === 0?[[root.val]]:[]
    }
    let left = pathSum(root.left,sum-root.val).map(it=>[root.val].concat(it))
    let right = pathSum(root.right,sum-root.val).map(it=>[root.val].concat(it))
    return left.concat(right)
};
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
let arr = [5,4,8,11,null,13,4,7,2,null,null,5,1]
let sum = 22
console.info(pathSum(toTree(arr),sum))