/**
* @author sirenia
* @date 2020-05-04
* eg:head_=>{next:{value:1,next:{value:2}}}
*    last=>head.next.next
*/
const newLinkedList = ()=>{
    //设计一个虚拟节点,它指向head节点.这样很多操作就不需要判断head节点是否为空了
    let head_ = null,
        last = null,
        size = 0
    const init = ()=>{
        head_ = {next:null}
        last = head_
        size = 0
    }
    init()
    const api = {
        add:elem=>{
            last.next = {value:elem,next:null}
            last = last.next
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
            while(node.next){
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
        //other methods:head,tail,init,last,filter,reduce,flatMap...
    }
    return api
}
let test = ()=>{
    let list = newLinkedList()
    list.add(1).add(2).add(3).forEach(console.info)
    list.clear()
    list.forEach(console.info)
    list.add(1).add(2).add(3).forEach(console.info)
    console.info(list.size())
}
test()