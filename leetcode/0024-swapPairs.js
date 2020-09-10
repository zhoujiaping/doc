/**
24. 两两交换链表中的节点
难度中等
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
示例:
给定 1->2->3->4, 你应该返回 2->1->4->3.
通过次数147,597提交次数221,497
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
var swapPairs = function(head) {
    return reverseKGroup(head,2)
};
var reverseKGroup = function(head, k) {
    let list = []
    let p = head
    let dummy = {next:head}
    let prevTail=dummy
    while(p){
        list.length=0
        for(let i=0;i<k&&p;i++){
            list.push(p)
            p = p.next
        }
        if(list.length==k){
            p = list[list.length-1].next
            prevTail.next = reverseList(list)
            prevTail = list[0]
        }else{
            prevTail.next = list[0]
        }
    }
    return dummy.next
};
function reverseList(list){
    for(let i=list.length-1;i>0;i--){
        list[i].next = list[i-1]
    }
    list[0].next = null
    return list[list.length-1]
}