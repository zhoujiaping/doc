/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 2020-06-22
 */
var addTwoNumbers = function(l1, l2) {
    let dummyHead = {}//利用空对象，统一头节点和其他节点的处理，简化代码。这在列表处理中很常见。
    let p=l1,q=l2
    let curr = dummyHead
    let carry = 0//定义变量保存进位，前后两次迭代之间的关联关系就是进位的关系
    while(p||q){
        let x = p?p.val:0
        let y = q?q.val:0
        let sum = x+y+carry
        //将除法替换为减法，不过貌似性能没有变化
        if(sum>9){
            sum = sum - 10
            carry = 1
        }else{
            carry = 0
        }
        //carry = ~~(sum/10)
        //curr.next = {val:sum%10}
        curr.next = {val:sum}
        curr=curr.next
        p=p?p.next:null
        q=q?q.next:null
    }
    if(carry){
        curr.next = {val:carry}
    }
    return dummyHead.next
};
function arrayToListNode(array){
    let dummyHead = {}
    let curr = dummyHead
    for(let i=0;i<array.length;i++){
        curr.next = {val:array[i]}
        curr = curr.next
    }
    return dummyHead.next
}
let l1 = arrayToListNode([2,4,3])
let l2 = arrayToListNode([5,6,4])
console.info(JSON.stringify(l1))
console.info(JSON.stringify(l2))
console.info(addTwoNumbers(l1,l2))