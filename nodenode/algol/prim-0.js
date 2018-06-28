/**
最小生成树
prim算法

优化思路：
g.vertexs = [{id:'A',used:false},{id:'B',used:false},{id:'C',used:false},{id:'D',used:false},{id:'E',used:false},{id:'F',used:false}];
g.edges = [
heap,
heap,
heap,
heap,
heap,
heap
];
heap是最小堆对象。最小堆每个节点是图的顶点。权重小于等于0的节点，不加入堆。
然后每次贪心获取和当前顶点权值最小的边的另一个顶点时，判断另一个顶点是否被使用(used是否为true)，
已经被使用那么就pop下一个节点，直到pop出一个未被使用过的顶点。
每次取出一个新的未被使用过的顶点，就将其标记为已使用。
时间复杂度由O(n2)变为O(nlogn),空间复杂度仍然为O(n2)，
根据稀疏程度有可能节省空间也可能用了更多空间，但是即使稀疏程度很低，多出的空间也非常少。
*/
function newGraph(){
    let g = {
        vertexs:[],//顶点集合
        edges:[]//,//边的集合。使用邻接矩阵，是一个二维数组。
        //edgesNum:0//边的条数
    };
    g.vertexs = ['A','B','C','D','E','F'];
    g.edges = [//0表示两个顶点没有边。大于0表示边的权重。  edge={y:二维数组第一维下标,x:第二维下标,weight:权重}
        [0  ,80  ,0  ,100  ,0  ,20  ],
        [80 ,0   ,90 ,0    ,0  ,0   ],
        [0  ,90  ,0  ,10   ,0  ,70  ],
        [100,0   ,10 ,0    ,60 ,0   ],
        [0  ,0   ,0  ,60   ,0  ,40  ],
        [20 ,0   ,70 ,0    ,40 ,0   ]
    ];
    return g;
}

function newGraph2(){
    let g = {
        vertexs:[],//顶点集合
        edges:[]//,//边的集合。使用邻接矩阵，是一个二维数组。
        //edgesNum:0//边的条数
    };
    g.vertexs = ['A','B','C','D','E','F'];
    g.edges = [//0表示两个顶点没有边。大于0表示边的权重。  edge={y:二维数组第一维下标,x:第二维下标,weight:权重}
        [0  ,1   ,1  ,0    ,0  ,1   ],
        [1  ,0   ,2  ,0    ,0  ,0   ],
        [1  ,2   ,0  ,3    ,0  ,0   ],
        [0  ,0   ,3  ,0    ,4  ,0   ],
        [0  ,0   ,0  ,4    ,0  ,5   ],
        [1  ,0   ,0  ,0    ,5  ,0   ]
    ];
    return g;
}
//纯函数
function findNextVertexAndEdge(graph,vertexs){
    let x=-1,y=-1,w=0;
    for(let i=0;i<vertexs.length;i++){
        let v = vertexs[i];
        for(let j=0;j<graph.edges.length;j++){
            if(graph.edges[v][j]<=0){
                continue;
            }
            if(w<=0 || w>0&&graph.edges[v][j]<w){
                w = graph.edges[v][j];
                y = v;
                x = j;
            }
        }
    }
    if(w <= 0){
        throw new Error('weight value error');
    }
    return {edge:{x,y,weight:w},vertex:x};
}
/**
计算最小生成树
结果元素
edge:
*/
function prim(graph){
    let res = [];
    let vertexs = [0];
    for(let i=0;i<graph.vertexs.length-1;i++){
        let {edge,vertex} = findNextVertexAndEdge(graph,vertexs);
        vertexs.push(vertex);
        //console.info(JSON.stringify(min));
        for(let j=0;j<vertexs.length;j++){//把新顶点到已知顶点的权改为其相反数（改成小于0）。
            let w = graph.edges[vertexs[j]][vertex];
            graph.edges[vertexs[j]][vertex] = -w;
            graph.edges[vertex][vertexs[j]] = -w;
        }
        res.push(edge);
    }
    return res;
}
function test(){
    let g = newGraph();
    let res = prim(g);
    console.info(JSON.stringify(res,null,2));
}
test();