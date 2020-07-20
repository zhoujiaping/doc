/**
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