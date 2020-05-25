/**
* @author sirenia
* @date 2020-05-04
* 其实可以基于之前定义的双向链表实现的list,但是作为练习,我们重新写个干净的,没有多余的方法
*/
const newLinkedStack = ()=>{
    //设计一个虚拟节点,它指向head节点.这样很多操作就不需要判断head节点是否为空了
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
        push:elem=>{//addLast
            let oldLast = last_.prev
            let node = {value:elem,prev:oldLast,next:last_}
            last_.prev = oldLast.next = node
            size = size+1
            return api
        },
        peek:()=>{
            if(size==0){
                throw new Error('stack is empty')
            }
            return last_.prev.value
        },
        //还可以用这种语法
        pop(){
            if(size==0){
                throw new Error('stack is empty')
            }
            let last = last_.prev
            last.prev.next = last.next
            last.next.prev = last.prev
            size = size - 1
            return last.value
        },
        empty:()=>{
            return size==0
        }
        //other methods
    }
    return api
}
let test = ()=>{
    let stack = newLinkedStack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    console.info(stack.pop())
    console.info(stack.peek())
    console.info(stack.pop())
    console.info(stack.empty())
    console.info(stack.pop())
    console.info(stack.empty())
    console.info(stack.pop())
}
test()