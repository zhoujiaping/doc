/**
2. 两数相加
难度中等
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
通过次数542,179提交次数1,420,446
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
addTwoNumbers = (l1,l2)=>{
    let dummy = {next:null},p0=dummy
    let p1 = l1,p2 = l2,p
    let carry = 0
    while(p1&&p2){
        p = {val:p1.val+p2.val+carry}
        carry = p.val/10|0
        p.val = p.val%10
        p0.next = p,p0=p
        p1 = p1.next,p2 = p2.next
    }
    if(p1==null)p1=p2
    while(p1!=null){
        p = {val:p1.val+carry}
        carry = p.val/10|0
        p.val = p.val%10
        p0.next = p,p0=p
        p1 = p1.next
    }
    return dummy.next
}
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