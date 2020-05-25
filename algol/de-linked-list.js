/**
* @author sirenia
* @date 2020-05-04
*/
const newDeLinkedList = ()=>{
    //设计一个虚拟头节点,它指向head节点.这样很多操作就不需要判断head节点是否为空了
    let head_ = null,
        last_ = null,
        size = 0
    const init = ()=>{
        head_ = {}
        last_ = {prev:head_}
        head_.next = last_
        size = 0
    }
    init()
    const api = {
        addFirst:elem=>{
            let oldHead = head_.next
            let node = {value:elem,next:oldHead,prev:head_}
            head_.next = oldHead.prev = node
            size = size+1
            return api
        },
        addLast:elem=>{
            let oldLast = last_.prev
            let node = {value:elem,prev:oldLast,next:last_}
            last_.prev = oldLast.next = node
            size = size+1
            return api
        },
        clear:()=>{
            init()
            return api
        },
        forEach:(f)=>{
            let node = head_
            let i = 0
            while(node.next && node.next.next){
                f(node.next.value,i++)
                node = node.next
            }
        },
        map:(mapper)=>{
            let arr = []
            api.forEach((value,i)=>arr.push(mapper(value,i)))
            return arr
        },
        size:()=>{
            return size
        }
        //other methods
    }
    return api
}
let test = ()=>{
    let list = newDeLinkedList()
    list.addFirst(1).addFirst(2).addFirst(3).forEach(console.info)
    list.clear()
    list.forEach(console.info)
    list.addLast(1).addFirst(2).addLast(3).forEach(console.info)
    console.info(list.size())
}
test()