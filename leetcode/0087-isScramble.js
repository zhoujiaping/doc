/**
87. 扰乱字符串
给定一个字符串 s1，我们可以把它递归地分割成两个非空子字符串，从而将其表示为二叉树。

下图是字符串 s1 = "great" 的一种可能的表示形式。

    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
在扰乱这个字符串的过程中，我们可以挑选任何一个非叶节点，然后交换它的两个子节点。

例如，如果我们挑选非叶节点 "gr" ，交换它的两个子节点，将会产生扰乱字符串 "rgeat" 。

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
我们将 "rgeat” 称作 "great" 的一个扰乱字符串。

同样地，如果我们继续交换节点 "eat" 和 "at" 的子节点，将会产生另一个新的扰乱字符串 "rgtae" 。

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
我们将 "rgtae” 称作 "great" 的一个扰乱字符串。

给出两个长度相等的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。

示例 1:

输入: s1 = "great", s2 = "rgeat"
输出: true
示例 2:

输入: s1 = "abcde", s2 = "caebd"
输出: false
通过次数13,071提交次数27,576
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 这个方法先生成了所有的树。如果只是为了解该题，并不需要生成所有树。
 很多树得到的字符串相同。
 */
var isScramble2 = function(s1, s2) {
	let trees = toTrees(s1)
	let set = new Set(trees.map(treeToString))
	return set.has(s2)
};
let isScramble = function(s1, s2) {
	if(s1==s2)return true
	if([...s1].sort().join('')!=[...s2].sort().join(''))return false
	for(let i=1;i<s1.length;i++){
		if(isScramble(s1.substr(0,i),s2.substr(0,i))&&isScramble(s1.substr(i),s2.substr(i)))return true
		if(isScramble(s1.substr(0,i),s2.substr(s1.length-i))&&isScramble(s1.substr(i),s2.substr(0,s1.length-i)))return true
	}
	return false
};
function toTrees(s){
	if(s.length==1)return [{val:s}]
	let trees = []
	for(let i=1;i<s.length;i++){
		let left = s.substr(0,i)
		let right = s.substr(i)
		let leftTrees = toTrees(left)
		let rightTrees = toTrees(right)
		//console.info(leftTrees)
		leftTrees.forEach(lt=>rightTrees.forEach(rt=>{
			trees.push({left:lt,right:rt})
			trees.push({left:rt,right:lt})
		}))
	}
	return trees
}
function treeToString(tree){
	if(tree.val!=null)return tree.val
	return treeToString(tree.left)+treeToString(tree.right)
}
//console.info([...new Set(toTrees('abcd').map(treeToString))])
let s1 = 'great',s2 = 'rgeat'
s1 ="acbdacabcdbdacbdacabcdbdacbdacabcdbdacbdacabcdbdacbdacabcdbdacbdacb",s2 ="acacbdacabcdbdacbdacabcdbdacbdacabcdbdacbdacabcdbdacbdacabcdbdacbda"
console.info(isScramble(s1,s2))
console.info('end')
