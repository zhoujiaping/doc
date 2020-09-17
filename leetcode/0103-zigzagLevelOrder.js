/**
103. 二叉树的锯齿形层次遍历
给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回锯齿形层次遍历如下：

[
  [3],
  [20,9],
  [15,7]
]
通过次数70,618提交次数128,458
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
 * @return {number[][]}

 dfs和bfs均可
 */
var zigzagLevelOrder = function(root) {
	if(root==null)return []
	let q1=[root],q2=[],q = q1
	let ans = [],arr,p
	while(q.length>0){
		arr = []
		while(q.length>0){
			p = q.shift()
			arr.push(p.val)
			if(q==q1){
				if(p.left!=null)q2.unshift(p.left)
				if(p.right!=null)q2.unshift(p.right)
			}else{
				if(p.right!=null)q1.unshift(p.right)
				if(p.left!=null)q1.unshift(p.left)
			}
		}
		ans.push(arr)
		if(q==q1)q=q2
		else q = q1
	}
	return ans
};

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
zigzagLevelOrder = root=>levelOrder(root).map((it,i)=>i%2==1?it.reverse():it)