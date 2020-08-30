/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
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