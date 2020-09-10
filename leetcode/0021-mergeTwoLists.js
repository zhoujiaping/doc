/**
21. 合并两个有序链表
难度简单
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
示例：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
通过次数363,837提交次数566,008
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let dummy = {}
    let p = dummy
    let p1 = l1,p2 = l2
    while(p1&&p2){
        if(p1.val<p2.val){
            p.next = p1
            p1 = p1.next
        }else{
            p.next = p2
            p2 = p2.next
        }
        p = p.next
    }
    if(p1){
        p.next = p1
    }else{
        p.next = p2
    }
    return dummy.next
};