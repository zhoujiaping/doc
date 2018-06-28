/**
 * prim算法
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/12/2815214.html
 */
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

优化：之前版本有3层循环，其实可以优化为2层的。
就是将findNextVertexAndEdge方法中查找最小边的逻辑优化一下。
定义一个数组，用于保存当前顶点到 各个顶点 的边的信息。
如果当前顶点到某顶点的权值不是最小，那么它肯定不在考虑范围内，那么该元素就是上次处理的顶点
到该顶点的边的信息。

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
        [0  ,1   ,1  , Infinity    ,Infinity  ,1   ],
        [1  ,0   ,2  ,Infinity    ,Infinity  ,Infinity   ],
        [1  ,2   ,0  ,3    ,Infinity  ,Infinity   ],
        [Infinity  ,Infinity  ,3  ,0    ,4  ,Infinity   ],
        [Infinity  ,Infinity   ,Infinity  ,4    ,0  ,5   ],
        [1  ,Infinity  ,Infinity ,Infinity    ,5  ,0   ]
    ];
    return g;
}

function findNextVertexAndEdge(graph,visited){
    //console.info(visited);
    let x=-1,y=-1,w=Infinity;
    for(let j=0;j<visited.length;j++){
        if(visited[j].weight<=0){
            continue;
        }
        if(visited[j].weight < w){
            w = visited[j].weight;
            y = visited[j].y;
            x = visited[j].x;
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
    let v = 0;//当前顶点
    let visited = [];//
    for(let i=0;i<graph.vertexs.length;i++){
        visited.push({
            y:0,//从第一个顶点开始
            x:i,
            weight:Infinity//为负值表示已经使用过,正值表示权值,Infinity表示无穷大
        });
    }
    //console.info(visited);
    for(let i=0;i<graph.vertexs.length-1;i++){//边的个数=顶点个数-1
        for(let j=0;j<visited.length;j++){//更新visited
            let w = graph.edges[v][j];//
            if(w < visited[j].weight){
            //如果当前顶点到某顶点的权值 比 上次顶点到某顶点的权值小，那么待会儿最小权值可能是当前顶点到某顶点的，不可能是上次顶点到某顶点的。
                visited[j].y = v;
                visited[j].x = j;
                visited[j].weight = w;
            }
        }

        //console.info(visited);

        let {edge,vertex} = findNextVertexAndEdge(graph,visited);
        //console.info(edge);
        //console.info(vertex);

        v = vertex;
        visited[v].weight = -visited[v].weight;
        /*
        //console.info(JSON.stringify(min));
        for(let j=0;j<vertexs.length;j++){//把新顶点到已知顶点的权改为其相反数（改成小于0）。
            let w = graph.edges[vertexs[j]][vertex];
            graph.edges[vertexs[j]][vertex] = -w;
            graph.edges[vertex][vertexs[j]] = -w;
        }*/
        res.push(edge);
    }
    return res;
}
function test(){
    let g = newGraph2();
    let res = prim(g);
    console.info(JSON.stringify(res,null,2));
}
test();
