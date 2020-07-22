/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
	if(nums.length<4)return []
	nums.sort((i1,i2)=>i1-i2)
	let j,x,y
	let sum,ret = []
	for(let i=0;i<nums.length-3;i++){
		for(j=i+1;j<nums.length-2;j++){
			x=j+1,y=nums.length-1
			while(x<y){
				sum = nums[i]+nums[j]+nums[x]+nums[y]
				if(sum==target){
					ret.push([nums[i],nums[j],nums[x],nums[y]])
					x++,y--
				}else if(sum<target){
					x++
				}else{
					y--
				}
			}
		}
	}
	let exists = new Set()
	return ret.filter((item,i)=>{
		let key = item.join(',')
		if(exists.has(key)){
			return false
		}
		exists.add(key)
		return true
	})
};
let nums = [1, 0, -1, 0, -2, 2]
let target = 0

nums = [-3,-2,-1,0,0,1,2,3]
nums = [-5,-4,-3,-2,-1,0,0,1,2,3,4,5]
let res = [[-5,-4,4,5],[-5,-3,3,5],[-5,-2,2,5],[-5,-2,3,4],[-5,-1,1,5],[-5,-1,2,4],[-5,0,0,5],[-5,0,1,4],[-5,0,2,3],[-4,-3,2,5],[-4,-3,3,4],[-4,-2,1,5],[-4,-2,2,4],[-4,-1,0,5],[-4,-1,1,4],[-4,-1,2,3],[-4,0,0,4],[-4,0,1,3],[-3,-2,0,5],[-3,-2,1,4],[-3,-2,2,3],[-3,-1,0,4],[-3,-1,1,3],[-3,0,0,3],[-3,0,1,2],[-2,-1,0,3],[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.info(res)
console.info(res.length)

fourSum = stopWatch(fourSum)
let ret = fourSum(nums,target)
console.info(ret.length)
console.info(ret)
console.info(fourSum.time())
let res0 = res.map(i=>i.join(','))
console.info(ret.map(i=>i.join(',')).filter(i=>res0.indexOf(i)<0))
function stopWatch(func){
    let costTime = -1
    const wrapper = function(...args){
        const begin = Date.now()
        const res = func(...args)
        const end = Date.now()
        costTime = end-begin
        return res
    }
    wrapper.time = ()=>costTime
    return wrapper
}
