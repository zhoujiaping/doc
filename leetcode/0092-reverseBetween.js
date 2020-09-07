/**
92. 反转链表 II
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
通过次数72,252提交次数140,778
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 空间复杂度O(n-m),可以优化到O(1)。
 比如反转 [1,2,3,4]，定义一个中间变量t，先反转1和2，变为[2,1,3,4]，然后反转2和3，变成[3,2,1,4]。
 反转的时候，前者保留对后续节点的引用，后者不保留。
 不断这样执行就可以了
 */
var reverseBetween = function(head, m, n) {
	//p:当前节点的前驱
	let dummy = {next:head},p=dummy,arr = [],pmPrev=p//第m个节点的前驱
	let c1=1,c2=1
	while(c2<=n){
		if(c1<m){
			c1++,pmPrev=p.next
		}else{
			arr.push(p.next)
		}
		p = p.next,c2++
	}
	//console.info(arr)
	let pnAfter = p.next
	for(let i=0;i<arr.length-1;i++){
		arr[i+1].next = arr[i]
	}
	arr[0].next = pnAfter
	pmPrev.next = arr[arr.length-1]
	//console.info(JSON.stringify(dummy.next))
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
let head = [1,2,3,4,5],m=2,n=4
let ans 
head = arrayToList(head)
ans = reverseBetween(head,m,n)
ans = listToArray(ans)
console.info(ans)