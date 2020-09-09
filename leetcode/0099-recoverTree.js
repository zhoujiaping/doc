/**
99. 恢复二叉搜索树
二叉搜索树中的两个节点被错误地交换。

请在不改变其结构的情况下，恢复这棵树。

示例 1:

输入: [1,3,null,null,2]

   1
  /
 3
  \
   2

输出: [3,1,null,null,2]

   3
  /
 1
  \
   2
示例 2:

输入: [3,1,4,null,null,2]

  3
 / \
1   4
   /
  2

输出: [2,1,4,null,null,3]

  2
 / \
1   4
   /
  3
进阶:

使用 O(n) 空间复杂度的解法很容易实现。
你能想出一个只使用常数空间的解决方案吗？
通过次数38,700提交次数62,347
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
    let vals = toArray(root)
    let sorted = vals.map(it=>it.val)
    sorted.sort((o1,o2)=>o1-o2)
    vals.forEach((it,i)=>it.val = sorted[i])
    return vals
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
let root = {
    val:2,
    left:{
        val:1
    },
    right:{
        val:6,
        left:{
            val:4,
            left:{
                val:3
            },
            right:{
                val:8,
                left:{
                    val:5
                },
                right:{
                    val:7
                }
            }
        },
        right:{
            val:9
        }
    }
}
let arr = [68,41,null,-85,null,-73,-49,-98,null,null,null,-124]
console.info(recoverTree(root).map(it=>it.val))

console.info(JSON.stringify(toTree(arr),true,2))