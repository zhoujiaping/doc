/**
61. 旋转链表
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
示例 2:

输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
通过次数81,367提交次数200,501
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
	if(head==null)return null
	let p1 = head,p = head,len = 1,dist = 0
	while(p.next!=null){
		p = p.next
		len++,dist++
		if(dist>k){
			p1 = p1.next
		}
	}
	if(dist<k){
		k = k%len
		return rotateRight(head,k)
	}
	p.next = head,head=p1.next,p1.next = null
	return head
};
let list = arrayToList([1,2,3,4,5])
let k = 2
list = arrayToList([0,1,2])
k = 4
console.info(listToArray(rotateRight(list,k)))
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
