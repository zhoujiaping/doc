/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 分治法。当然有各种方法分治，比如将子问题视为合并两个list。
 如果各个链表非常大，大到内存存不下，那么这就是一道经典的合并排序用于外排的算法题了。
 这时候先从k个列表中放到堆中，堆中的每个元素是一个列表，元素的大小就是列表头的val。
 一直从堆中取表头，直到堆为空。
 */
var mergeKLists = function(lists) {
    lists = lists.filter(i=>i)
    return mergeKLists0(lists)
}
function mergeKLists0(lists) {
    if(lists.length===0)return null
    let minIndex = 0,minVal=lists[0].val
    for(let i=0;i<lists.length;i++){
    	if(lists[i].val<minVal){
    		minVal = lists[i].val,minIndex = i
    	}
    }
    let head = lists[minIndex]
    lists[minIndex] = lists[minIndex].next
    if(lists[minIndex]==null){
    	lists.splice(minIndex,1)
    }
    head.next = mergeKLists0(lists)
    return head
};
console.info(JSON.stringify(mergeKLists([[1,4,5],[1,3,4],[2,6]].map(toList))))
function toList(array){
	let dummy = {},p = dummy
	array.forEach(i=>{
		p.next = {val:i}
		p = p.next
	})
	return dummy.next

}