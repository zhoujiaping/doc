/**
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