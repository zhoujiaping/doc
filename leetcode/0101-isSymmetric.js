/**
101. 对称二叉树
给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
 

进阶：

你可以运用递归和迭代两种方法解决这个问题吗？

通过次数204,275提交次数385,941
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
var isSymmetric = function(root) {
	if(root==null)return true
	return isSameTree(root,reverse(root))
};
isSymmetric = function(root) {
	if(root==null)return true
	return eq(root.left,root.right)
	function eq(t1,t2){
		if(t1==null && t2==null)return true
		if(t1==null || t2==null)return false
		return t1.val==t2.val && eq(t1.left,t2.right) &&eq(t1.right,t2.left)
	}
};
function reverse(root){
	if(root==null)return root
	let newRoot = {val:root.val,left:reverse(root.right),right:reverse(root.left)}
	return newRoot
}

function isSameTree(p, q) {
    if(p==null&&q==null)return true
    if(p==null||q==null)return false
    return p.val==q.val&&isSameTree(p.left,q.left)&&isSameTree(p.right,q.right)
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
let arr = [1,2,2,3,4,4,3]
arr = [1,2,2,null,3,null,3]
let tree = toTree(arr)
console.info(isSymmetric(tree))