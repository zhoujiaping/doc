/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let i1 = 0;
	let i2 = 0;
	let i = 0;
	let k = nums1.length+nums2.length;
	let len1 = nums1.length;
	let len2 = nums2.length;
	let prevNum = 0;
	let num = 0;
	let p = k>>1;
	while(true){
		prevNum = num;
		if(i1>=len1){
			num = nums2[i2];
			i2++;
		}else if(i2>=len2){
			num = nums1[i1];
			i1++;
		}else{
			if(nums1[i1]<nums2[i2]){
				num = nums1[i1];
				i1++;
			}else{
				num = nums2[i2];
				i2++;
			}
		}
		if(i==p){
			return k%2==1?num:(prevNum+num)/2;
		}
		i++;
	}	
};
let nums1 = [2];
let nums2 = [];
let res = findMedianSortedArrays(nums1,nums2);
console.info(res);