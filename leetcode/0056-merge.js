/**
56. 合并区间
给出一个区间的集合，请合并所有重叠的区间。

 

示例 1:

输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2:

输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
注意：输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名。

 

提示：

intervals[i][0] <= intervals[i][1]
通过次数136,478提交次数317,572
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
	if(intervals.length<2){
		return intervals
	}
	let ans = []
	intervals.reduce(insert,ans)
	return ans
};
/**
intervals:已merge的区间
ps:假设[1,3]和[4,6]没有交集（既然是整数，为什么不能可以合并为[1,6]?）
*/
function insert(intervals,interval){
	if(intervals.length==0){
		return intervals.push(interval),intervals
	}
	let left = -1,right = intervals.length
	for(let i=0;i<intervals.length;i++){
		if(intervals[i][1]>=interval[0]){
			break;
		}
		left = i
	}
	for(let i=intervals.length-1;i>=0;i--){
		if(intervals[i][0]<=interval[1]){
			break;
		}
		right = i
	}
	let merged
	if(right-left-1>0){
		merged = [Math.min(interval[0],intervals[left+1][0]),Math.max(interval[1],intervals[right-1][1])]
	}else{
		merged = interval
	}	
	intervals.splice(left+1,right-left-1,merged)
	return intervals
}
//网友的方法，灰常nice啊
merge = function (intervals) {
    if (intervals.length == 0) return []

    intervals = intervals.sort((a, b) => {
        return a[0] - b[0]
    })

    let res = [intervals[0]]

    for (let i = 1; i < intervals.length; i++) {

        if(intervals[i][0]>res[res.length-1][1])
            res.push(intervals[i])
            else
            if(intervals[i][1]>res[res.length-1][1])
                res[res.length-1][1]=intervals[i][1]
        }
    return res
}
//网友的方法
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
merge = function (intervals) {
  let list = [];
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  let gap = intervals[0];
  intervals.slice(1).forEach((ary) => {
    if (gap[0] <= ary[0] && ary[0] <= gap[1]) {
      if (gap[1] <= ary[1]) {
        gap[1] = ary[1];
      }
    } else {
      list.push([...gap]);
      gap = [...ary];
    }
  });
  list.push([...gap]);
  // return intervals;
  return list;
};
let interval = [2,6]
let intervals = [[1,3],[8,10],[15,18]]
intervals = [[1,3],[6,9]]
interval = [2,5]

intervals = [[1,5]]
interval = [6,8]

console.info(insert(intervals,interval))

console.info(merge([[1,3],[2,6],[8,10],[15,18]]))