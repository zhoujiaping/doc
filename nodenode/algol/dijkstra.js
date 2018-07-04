/**
 * Dijkstra算法
 * https://blog.csdn.net/heroacool/article/details/51014824
 * https://www.cnblogs.com/jason2003/p/7222182.html
 * 求顶点A到其他顶点的最短路径
 */
let max = Infinity;
function newGraph(){
    return {
        vertexs:['A','B','C','D','E'],
        edges:[
            [0,5,8,max,max],
            [5,0,1,3,2],
            [8,1,0,max,max],
            [max,3,max,0,7],
            [max,2,max,7,0]
        ]
    };
}
function dijkstra(g,sv){
    let edges = g.edges;
    //let sv = 0;//初始源顶点
    let u = edges[sv].map((item,index)=>index);//未遍历顶点
    //console.info(u);
    let s = [];//源顶点到各顶点的最短路径值以及路径
    for(let i=0;i<u.length;i++){
        s.push({
            w:edges[sv][u[i]],
            path:[sv]
        });
    }
    let pre = u.map(i=>sv);//各顶点上次更新最短路径时的源顶点
    u.splice(sv,1);//未遍历的顶点中移除源顶点
    let v = sv;//当前源顶点
    while(u.length>0){
        //寻找离当前源顶点最近的顶点
        let minI = 0;//最近顶点在u中的下标
        let min = u[minI];//最近顶点
        let minW = edges[v][min];//最近顶点权值
        for(let i=1;i<u.length;i++){
            if(edges[v][u[i]] < minW){
                minI = i;
                min = u[i];
                minW = edges[v][min];
            }
        }
        //console.info(`min=${min}`);
        //更新最短路径，上次更新最短路径时的源顶点，用于记录路径信息
        for(let i=0;i<u.length;i++){
            if(s[min].w + edges[min][u[i]] < s[u[i]].w){
                s[u[i]].w = s[min].w + edges[min][u[i]];
                pre[u[i]] = min;
            }
        }
        u.splice(minI,1);//
        s[min].path = s[pre[min]].path.map(i=>i);//记录当前源顶点的最短路径信息到s。以上次更新最短路径时的源顶点的路径为基础。
        s[min].path.push(min);//再加上当前顶点
        v = min;//更新当前源顶点
        //console.info(`pre=`);
        //console.info(pre);
    }
    //console.info(s);
    return s;
}
function test(){
    let g = newGraph();
    let res = dijkstra(g,0);
    console.info(res);
}
test();