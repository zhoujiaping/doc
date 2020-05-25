/**
 * 双端队列 double-queue
 * 用js实现，简单的不要不要的。都不用搞什么循环数组了。
 * http://www.cnblogs.com/huangxincheng/archive/2013/03/20/2971671.html
 */
function newDeque(){
    let arr = []
    return {
        isEmpty(){
            return arr.length===0
        },
        size(){
            return arr.length
        },
        getFirst(){
            if(arr.length<1){
                throw new Error('queue is empty')
            }
            return arr[0]
        },
        getLast(){
            if(arr.length<1){
                throw new Error('queue is empty')
            }
            return arr[arr.length-1]
        },
        removeFirst(){
            if(arr.length<1){
                throw new Error('queue is empty')
            }
            return arr.shift()
        },
        removeLast(){
            if(arr.length<1){
                throw new Error('queue is empty')
            }
            return arr.pop()
        },
        addFirst(ele){
            return arr.unshift(ele)
        },
        addLast(ele){
            return arr.push(ele)
        },
        toString(){
            return JSON.stringify(arr)
        }
    };
}
function test(){
    let deque = newDeque()
    deque.addFirst('hello')
    deque.addLast('world')
    deque.addFirst('good')
    //deque.removeLast()
    console.info(deque.toString())
}
test()
