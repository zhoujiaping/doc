/**
637. 二叉树的层平均值
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
示例 1：

输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
提示：

节点值的范围在32位有符号整数范围内。
通过次数39,580提交次数58,070
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 这不就是层序遍历么
 */
var averageOfLevels = function(root) {
    if(root==null)return [0]
    //q1为当前遍历的队列，q2为下一次遍历的队列
    let q1 = [],q2 = [root]
    let ans = []
    while(q2.length>0){
        q1 = q2
        q2 = []
        ans.push(q1.map(it=>it.val).reduce((prev,curr)=>prev+curr)/q1.length)
        q1.forEach(it=>{
            if(it.left)q2.push(it.left)
            if(it.right)q2.push(it.right)
        })
    }
    return ans
};