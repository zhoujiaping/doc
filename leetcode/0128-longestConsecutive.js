/*
128. 最长连续序列
给定一个未排序的整数数组，找出最长连续序列的长度。
要求算法的时间复杂度为 O(n)。
示例:
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
通过次数79,923提交次数153,348
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
function newLinkedHashMap(){
	let head = {}
	let last = {prev:head}
	head.next = last
	let map = new Map()
	return {
		set:(key,value)=>{
			let node = {
				next:last,
				prev:last.prev,
				key:key,
				value:value
			}
			last.prev.next = node
			last.prev = node
			map.set(key,node)
		},
		get:key=>{
			let node = map.get(key)
			if(node)return node.value
			return null
		},
		remove:key=>{
			if(key!=null){
				let node = map.get(key)
				if(node==null)return null
				map.delete(key)
				node.prev.next = node.next
				node.next.prev = node.prev
				return node.value
			}else{//removeFirst
				let node = head.next
				node.prev = head
				head.next = node.next
				map.delete(node.key)
				return node.value
			}
		},
		size:()=>{
			return map.size
		},
		getMap:()=>{
			return map
		}
	}
}
var longestConsecutive0 = function(nums) {
	let map = newLinkedHashMap()
	nums.forEach(it=>{
		map.set(it,it)
	})
	let arr = [],ans = []
	while(map.size()>0){
		let curr = map.remove()
		let prev = curr,next = curr
		while((prev=map.remove(prev-1))!=null){
			arr.push(prev)
		}
		arr.push(curr)
		while((next=map.remove(next+1))!=null){
			arr.push(next)
		}
		if(arr.length>ans.length){
			ans = arr
		}
		arr = []
	}
	return ans
};
let longestConsecutive = nums=>longestConsecutive0(nums).length

longestConsecutive = nums=>{
	let set = new Set(nums)
	let arr = [],ans = [],prev,next
	nums.forEach(it=>{
		if(!set.delete

			(it))return
		prev = next = it
		while((set.delete(--prev))){
			arr.push(prev)
		}
		arr.push(it)
		while((set.delete(++next))){
			arr.push(next)
		}
		if(arr.length>ans.length){
			ans = arr
		}
		arr = []
	})
	return ans
}
let nums = [2,1,4,5,3,7]
console.info(longestConsecutive(nums))