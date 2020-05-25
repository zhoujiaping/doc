/**
 * Dijkstra算法
 * https://blog.csdn.net/heroacool/article/details/51014824
 * https://www.cnblogs.com/jason2003/p/7222182.html
 * 求顶点A到其他顶点的最短路径
 */
let max = Infinity
function newGraph(){
    return {
        vertexs:['A','B','C','D','E'],
        edges:[
            [0  ,5  ,8  ,max,max],
            [5  ,0  ,1  ,3  ,2  ],
            [8  ,1  ,0  ,max,max],
            [max,3  ,max,0  ,7],
            [max,2  ,max,7  ,0]
        ]
    }
}
/**
g:图
sv:源顶点的下标
*/
function dijkstra(g,sv){
    let edges = g.edges
    //未遍历的顶点集合
    let u = edges[sv].map((dist,index)=>{
        return {
            name:g.vertexs[index],//顶点的名称，冗余字段
            dist:max,//顶点离源顶点的路径
            index:index,//顶点在vertexs中的下标            
            path:[sv],//源顶点到顶点的路径
            pathName:[g.vertexs[sv]]//路径名称，冗余字段
        }

    })
    /*提前将各顶点的出度计算好,这样可以减少很多
不必要的计算。初始时，u数组的下标，和u数组中元素的index值是对应相等的。*/
    u.forEach((item,index)=>{
        item.outVertexs  = u.filter((outer,outerIndex)=>{
            return edges[index][outerIndex]!=0 && edges[index][outerIndex]<max
        })
    })
    u[sv].dist = 0
    //已遍历顶点
    let s = []
    while(u.length>0){
        //从u中找离源顶点距离最近的顶点。
        let min = u.reduce((prev,curr)=>{
            if(prev){
                return curr.dist<prev.dist?curr:prev    
            }
            return curr
        },null)
        //遍历min的出度，如果某个顶点经过min顶点与源顶点的距离变小了，那么更新它的距离和路径
        min.outVertexs.forEach(item=>{
            let newdist = min.dist + edges[min.index][item.index]
            if(newdist < item.dist){
                item.dist = newdist
                item.path = min.path.concat([item.index])
                item.pathName = min.pathName.concat([item.name])
            }
        })
        /*
        //遍历u，如果某个顶点经过min顶点与源顶点的距离变小了，那么更新它的距离和路径
        u.forEach(item=>{
            let newdist = min.dist + edges[min.index][item.index]
            if(newdist < item.dist){
                item.dist = newdist
                item.path = min.path.concat([item.index])
                item.pathName = min.pathName.concat([item.name])
            }
        })*/
        //min顶点已遍历，添加到已遍历集合，并且从未遍历集合中删除
        s.push(min)
        u = u.filter(item=>item.index!=min.index)
        /**TODO 优化 如果u为二叉堆，获取min，以及删除min顶点，这两个操作可以简化成delMin一个操作。
        如果是稀疏图，那么适合用邻接表来表示图。那么遍历u的操作，改成遍历min的出度。
        或者提前将各节点的出度计算好。
        */
    }
    return s
}
function test(){
    let g = newGraph()
    let res = dijkstra(g,0)
    console.table(res)
}
test()
