/**
102. 二叉树的层序遍历
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
示例：
二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
通过次数191,534提交次数302,392
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
let root = toTree([3,9,20,null,null,15,7])
console.info(JSON.stringify(root,true,2))
console.info(levelOrder(root))