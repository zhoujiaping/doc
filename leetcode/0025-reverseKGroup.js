
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
let data = [1,2,3,4,5]
console.info(toArray(reverseKGroup(toList(data),2)))

function reverseList(list){
    for(let i=list.length-1;i>0;i--){
        list[i].next = list[i-1]
    }
    list[0].next = null
    return list[list.length-1]
}
function toList(array){
    let dummy = {},p = dummy
    array.forEach(i=>{
        p.next = {val:i}
        p = p.next
    })
    return dummy.next
}
function toArray(list){
    let array = []
    while(list){
        array.push(list.val)
        list = list.next
    }
    return array
}