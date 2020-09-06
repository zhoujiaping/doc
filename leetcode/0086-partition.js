/**
给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

示例:

输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
通过次数50,373提交次数84,698

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
	if(head==null)return null
	let smallDummy = {next:null},bigDummy= {next:null}
	let p1=smallDummy,p2=bigDummy,p=head
	while(p!=null){
		if(p.val<x){
			p1.next = p,p1=p1.next
		}else{
			p2.next = p,p2=p2.next
		}
		p = p.next
	}
	p1.next = bigDummy.next,p2.next = null
	return smallDummy.next
};