/**
19. 删除链表的倒数第N个节点
难度中等
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：
给定的 n 保证是有效的。
进阶：
你能尝试使用一趟扫描实现吗？
通过次数229,959提交次数583,719
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 应该很少有比这更简洁的了吧
 */
var removeNthFromEnd = function(head, n) {
    let list = [],p = {next:head}
    while(p){
        list.push(p)
        p = p.next
    }
    let len = list.length
    list[len-n-1].next = list[len-n].next
    return list[0].next
};