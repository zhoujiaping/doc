/**
洗牌算法
https://github.com/hanzichi/underscore-analysis/issues/15
https://www.h5jun.com/post/array-shuffle.html
场景：随机产生100个数字，数字范围1-100，并且它们不重复。
*/

function shuffle2(arr){//时间复杂度O(nlogn)
    arr.sort(()=>Math.random() - 0.5)
}
function shuffle(arr){//时间复杂度O(n)
    arr = arr.concat()
    let temp = null
    let r = Math.random()*arr.length|0
    for(let i=0;i<arr.length;i++){
        temp = arr[i]
        arr[i] = arr[r]
        arr[r] = temp
    }
    return arr
}
function test(){
    let arr = range(101,1)
    arr = shuffle(arr)
    console.info(arr)
}
function range(end,start=0,step=1){
    let res = []
    for(let i=start;i<end;i+=step){
        res.push(i)
    }
    return res
}
test()