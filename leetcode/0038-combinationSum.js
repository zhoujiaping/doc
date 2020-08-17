/**
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
示例 1：

输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
示例 2：

输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
 

提示：

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 回溯算法
 */
var combinationSum = function(candidates, target) {
	candidates = [...new Set(candidates)].filter(it=>it<=target)
	candidates.sort((o1,o2)=>o1-o2)
	let result = []
	tryResolve({arr:[],target,sum:0,i:0})
	return result
	function tryResolve(acc){
		for(let i=acc.i;i<candidates.length;i++){
			if(acc.sum+candidates[i]==target){
				result.push(acc.arr.concat([candidates[i]]))
			}else if(acc.sum+candidates[i]<target){
				tryResolve({arr:acc.arr.concat([candidates[i]]),target:target-candidates[i],sum:acc.sum+candidates[i],i:i})
			}else{
				break
			}
		}
	}
};
console.info(JSON.stringify(combinationSum([2,2,3,4,7,8],7),true,2))
console.info(JSON.stringify(combinationSum([8,7,4,3],11),true,2))