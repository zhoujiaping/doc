/**
 * 最大堆 可以实现优先级队列，可以用于排序
 * 一般采用数组实现，否则计算节点太复杂，因为树并不是完全有序的。
 * 为了计算方便，第一个元素不用。
 * https://baike.baidu.com/item/%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91/7773232?fr=aladdin
 * https://blog.csdn.net/qwezhaohaihong/article/details/51050778
 */
/*function isLeft(i){
    return i%2 === 0;
}
function isRight(i){
    return i%2 === 1;
}
function isRoot(i){
    return i===1;
}*/
/**
 * 给定节点的下标，计算其父节点的下标。
 */
function parent(i){
    return i>>1|0;//if i>1  按位或0,可以将小数向下取整。i/2|0
}
/**
 * 给定节点的下标，计算其左孩子的下标。
 * @param i
 * @returns {Number}
 */
function leftChild(i){
    return i<<1;//if 2*i<=n
}
/**
 * 给定节点的下标，计算其右孩子的下标。
 * @param i
 * @returns {Number}
 */
function rightChild(i){
    return (i<<1)+1;//if 2*i+1<=n
}
/*function isLeaf(i){
    return i>n/2|0;
}
function hasTwoChild(i){
    return i<(n-1)/2|0;
}*/
function shiftUp(heap,i){
    let nodes = heap.nodes;
    let p = parent(i);
    if(p>0 && shift(heap,i,p)){
        shiftUp(heap,p);
    }
}
function shift(heap,i,p){
    let nodes = heap.nodes;
    if(heap.cmp(nodes[i],nodes[p])>0){
        let tmp = nodes[i];
        nodes[i] = nodes[p];
        nodes[p] = tmp;
        return true;//产生了交换
    }
    return false;
}
function shiftDown(heap,i){
    let nodes = heap.nodes;
    let left = leftChild(i);
    let right = rightChild(i);
    if(left<=heap.size()){//left<=size//有左孩子
    	if(right<=heap.size()){//有右孩子
    		if(heap.cmp(nodes[left],nodes[right])>0){//比较左右孩子大小
        		if(shift(heap,left,i)){
                    shiftDown(heap,left);
                }
        	}else{
        		if(shift(heap,right,i)){
                    shiftDown(heap,right);
                }
        	}
    	}else{//
    		if(shift(heap,left,i)){
                shiftDown(heap,left);
            }
    	}
    }
}
const proto = {
        pop:function(){
            let size = this.size();
            if(size==0){
                return null;
            }
            let res = this.nodes[1];
            this.nodes[1] = this.nodes[size];
            this.nodes.length = size;
            shiftDown(this,1);
            return res;
        },
        peek:function(){
            if(this.nodes.size()>=1){
                return this.nodes[1];
            }
            return null;
        },
        add:function(obj){
            if(obj == null){
                throw new Error('obj must not be null');
            }
            this.nodes.push(obj);
            shiftUp(this,this.size());
        },
        size:function(){
            return this.nodes.length-1;
        }
};
let newHeap = function(cmp){
    if(cmp==null){
        throw new Error('cmp must not be null');
    }
    const heap = Object.create(proto);
    heap.nodes = [0];
    heap.cmp = cmp;
    return heap;
};
function test(){
    let nums = [10,8,15,20,7,3,24,14,2,1];
    let heap = newHeap((o1,o2)=>o1-o2);
    nums.forEach(i=>{
        heap.add(i);
        console.table(heap);
    });
}
test();
