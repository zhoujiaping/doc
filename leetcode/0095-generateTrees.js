/**
95. 不同的二叉搜索树 II
给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。

示例：

输入：3
输出：
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
解释：
以上的输出对应以下 5 种不同结构的二叉搜索树：

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3

提示：
0 <= n <= 8
通过次数59,871提交次数89,778
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 二叉搜索树:左子树的所有节点的值比根节点的值小，右子树的所有节点的值比根节点的大。
 */
var generateTrees = function(n) {
	if(n==0)return []
    let seq = range(1,n+1)
	return generateTrees0(seq)
};
function generateTrees0(seq){
	if(seq.length==0)return [null]
	let trees = []
	for(let i=0;i<seq.length;i++){
		let leftSeq = seq.slice(0,i)
		let leftTrees = generateTrees0(leftSeq)
		let rightSeq = seq.slice(i+1)
		let rightTrees = generateTrees0(rightSeq)
		for(let j=0;j<leftTrees.length;j++){
			for(let k=0;k<rightTrees.length;k++){
				trees.push({val:seq[i],left:leftTrees[j],right:rightTrees[k]})
			}
		}
	}
	return trees
}
function range(from,to,step=1){
	let arr = []
	let i
	if(step>0){
		for(i=from;i<to;i=i+step){
			arr.push(i)
		}
	}else if(step<0){
		for(i=from;i>to;i=i+step){
			arr.push(i)
		}
	}else{
		throw new Error(`step can't be zero!`)
	}
	return arr
}
console.info(generateTrees(0))