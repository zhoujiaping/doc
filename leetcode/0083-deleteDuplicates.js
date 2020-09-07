/**
83. 删除排序链表中的重复元素
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

输入: 1->1->2
输出: 1->2
示例 2:

输入: 1->1->2->3->3
输出: 1->2->3
通过次数135,948提交次数264,687
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
	if(head==null)return null
	let dummy={next:null},p=dummy,p1=head,p2=head.next,count=1//p1.val重复次数
	while(p1.next!=null){
		if(p1.val==p1.next.val){
			count++
		}else{
			p.next=p1,p=p.next
			count=1
		}
		p1=p1.next
	}
	p.next=p1,p=p.next
	p.next=null
	return dummy.next
};
function arrayToList(arr){
	if(arr==null||arr.length==0)return null
	let head = {},p
	arr[arr.length-1] = {next:null,val:arr[arr.length-1]}
	for(let i=arr.length-2;i>=0;i--){
		arr[i] = {next:arr[i+1],val:arr[i]}
	}
	return arr[0]
}
function listToArray(list){
	if(list==null)return null
	let p = list
	let arr = []
	while(p!=null){
		arr.push(p.val)
		p = p.next
	}
	return arr
}
let arr = [1,2,3,3,4,4,5]
//arr = [1,1,1,2,3]
//arr = [1]
//arr = [1,1]
//arr = [1,2,2]
//arr = [1,1,2,2,3,4,4,4,5]
let list = arrayToList(arr)
console.info(listToArray(deleteDuplicates(list))) 