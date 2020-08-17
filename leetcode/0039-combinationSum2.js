/**

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
通过次数74,997提交次数120,022

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
	candidates.sort((o1,o2)=>o1-o2)
	let result = []
	tryResolve({arr:[],target,sum:0,i:-1})
	return result
	function tryResolve(acc){
		let prev = -1
		for(let i=acc.i+1;i<candidates.length;i++){
			if(prev==candidates[i]){
				continue
			}
			if(acc.sum+candidates[i]==target){
				result.push(acc.arr.concat([candidates[i]]))
			}else if(acc.sum+candidates[i]<target){
				tryResolve({arr:acc.arr.concat([candidates[i]]),target:target-candidates[i],sum:acc.sum+candidates[i],i:i})
			}else{
				break
			}
			prev = candidates[i]
		}
	}
};
console.info(JSON.stringify(combinationSum2([2,2,3,4,7,8],7),true,2))
console.info(JSON.stringify(combinationSum2([8,7,4,3],11),true,2))
console.info(JSON.stringify(combinationSum2([10,1,2,7,6,1,5],8),true,2))
