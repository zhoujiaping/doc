/**
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/17/2821132.html
 */
const max = Infinity
function kruskal(graph){
	//最小堆，这里不一定要用堆，只要保证边的集合是按大小升序排序的即可。
	const heap = newHeap((item1,item2)=>item2.weight-item1.weight)
	graph.edges.forEach((weights,i)=>{
		weights.forEach((weight,j)=>{
			if(i>j && weight<max){
				heap.add({
					from:graph.vertexs[i],//顶点1的名称
					to:graph.vertexs[j],//顶点2的名称
					weight//边的权重
				})
			}
		})
	})
	//console.info(heap)
	//console.info(heap.pop())
	//并查集
	const uf = newUF(graph.vertexs)
	//最小生成树的边的集合
	const edges = []
	while(heap.size()>0){
		let min = heap.pop()
		let group1 = uf.find(min.from)
		let group2 = uf.find(min.to)
		if(group1 != group2){
			edges.push(min)
			uf.union(min.from,min.to)
		}
	}
	return edges
}
function test(){
	const graph = {
		vertexs:['v1','v2','v3','v4','v5','v6','v7'],
		edges:[
			[0  ,2  ,4  ,1  ,max,max,max],
			[2  ,0  ,max,3  ,10 ,max,max],
			[4  ,max,0  ,2  ,max,5  ,max],
			[1  ,3  ,2  ,0  ,7  ,8  ,4  ],
			[max,10 ,max,7  ,0  ,max,6  ],
			[max,max,5  ,8  ,max,0  ,1  ],
			[max,max,max,4  ,6  ,1  ,0  ]
		]
	}
	const edges = kruskal(graph)
	console.info(edges)
}
test()

/**************** heap ****************/
function parent(i){
    return i>>1|0;//if i>1  按位或0,可以将小数向下取整。i/2|0
}
function leftChild(i){
    return i<<1;//if 2*i<=n
}
function rightChild(i){
    return (i<<1)+1;//if 2*i+1<=n
}
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
function newHeap(cmp){
    if(cmp==null){
        throw new Error('cmp must not be null');
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
    const heap = Object.create(proto);
    heap.nodes = [0];
    heap.cmp = cmp;
    return heap;
};
/***************** union-find ********************/
function newUF(list){
 	//名称到编号的映射
 	const map = new Map()
 	list.forEach((item,index)=>map.set(item,index))
 	//各编号对应元素的父节点下标
 	const nodes = list.map(item=>-1)
 	const uf = {
 		//
 		union(...args){
 			let [val1,val2,...rest] = args
 			if(rest.length>0){
 				uf.union(val1,val2)
 				rest.forEach(item=>uf.union(val1,item))
 				return
 			}
 			const group1 = uf.findIndex(val1)
 			const group2 = uf.findIndex(val2)
 			if(group1==group2){
 				return
 			}
 			const size1 = -nodes[group1]
 			const size2 = -nodes[group2]
 			if(size1<size2){
 				nodes[group2] = nodes[group2] + nodes[group1]
 				nodes[group1] = group2
 			}else{
 				nodes[group1] = nodes[group2] + nodes[group1]
 				nodes[group2] = group1
 			}
 			//console.info(nodes)
 		},
 		//查找元素所在的集的下标
 		findIndex(val){
 			let index = map.get(val)
 			let rootIndex = index
 			while(nodes[rootIndex]>=0){
 				rootIndex = nodes[rootIndex]
 			}
 			//路径压缩,将当前节点及其祖先节点,都设置为根的子节点
 			let pre = nodes[index]
 			while(pre>=0){
 				nodes[index] = rootIndex
 				index = pre
 				pre = nodes[index]
 			}
 			return rootIndex
 		},
 		//查找元素所在的集
 		find(val){
 			return list[uf.findIndex(val)]
 		}
 	}
 	return uf
}