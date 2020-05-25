/**
图算法-简单的最大网络流算法
https://baike.baidu.com/item/%E6%9C%80%E5%A4%A7%E6%B5%81%E9%97%AE%E9%A2%98/19144252?fr=aladdin
*/
/** 为了能够复用之前写的dijkstra算法的代码，我们用邻接数组表示
//顶点
const vertexs = new Map();//为什么这个分号不能省略？

['s','a','b','c','d','t'].forEach(name=>{
	vertexs.set(name,{
		name,//顶点名称
		succs:[]//顶点的后继
	})
})
//设置顶点的后继
vertexs.get('s').succs.splice(0,0,{
	dist:3,
	vertex:vertexs.get('a')
},{
	dist:2,
	vertex:vertexs.get('b')
})

vertexs.get('a').succs.splice(0,0,{
	dist:1,
	vertex:vertexs.get('b')
},{
	dist:3,
	vertex:vertexs.get('c')
},{
	dist:4,
	vertex:vertexs.get('d')
})

vertexs.get('b').succs.splice(0,0,{
	dist:2,
	vertex:vertexs.get('d')
})

vertexs.get('c').succs.splice(0,0,{
	dist:2,
	vertex:vertexs.get('t')
})

vertexs.get('d').succs.splice(0,0,{
	dist:3,
	vertex:vertexs.get('t')
})

console.table(vertexs)*/
/* 貌似数组描述更简洁*/
/*dijkstra代码拷贝过来的*/
let max = Infinity
function newGraph(){
    return {
    	//值为顶点名称
        vertexs:['s','a','b','c','d','t'],
        //值为对应边的容量
        edges:[
			[null,3,2,0,0,0],
			[0,null,1,3,4,0],
			[0,0,null,0,2,0],
			[0,0,0,null,0,2],
			[0,0,0,0,null,3],
			[0,0,0,0,0,null]
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
/*
function test(){
    let g = newGraph()
    let res = dijkstra(g,0)
    console.table(res)
}
test()
*/

function maxNetFlow(g,dg,sourceName,targetName){
	//先找一条路径s->...->t
    let minPaths = dijkstra(dg,g.vertexs.indexOf(sourceName))
    //console.table(minPaths)
    let targetPath = minPaths.filter(p=>p.name==targetName)[0]
    if(targetPath.dist==max){
    	return []
    }
    //console.info('path: '+targetPath.pathName.join('->'))
    //已经得到一条路径 s->a->d->t,接下来获取这条路径上的流量
    let pathIndexs = targetPath.pathName.map(name=>g.vertexs.indexOf(name))
    //console.info(pathIndexs)
    let sourceIndex = g.vertexs.indexOf(sourceName)
    let flow = pathIndexs.slice(1)
    	.map((pathIndex,index)=>g.edges[pathIndexs[index]][pathIndex])
    	.reduce((prev,curr)=>prev<curr?prev:curr,max)
    //console.info(`flow: ${flow}`)
    //计算残余图，并且添加反向路径
    pathIndexs.slice(1)
    	.forEach((pathIndex,index)=>{
    		g.edges[pathIndexs[index]][pathIndex]-=flow
    		g.edges[pathIndex][pathIndexs[index]]+=flow
    		//如果流量等于容量，那么这条边已经不能再有流量了
    		if(g.edges[pathIndexs[index]][pathIndex]==0){
    			dg.edges[pathIndexs[index]][pathIndex] = max	
    		}
    		//新增了路径，在用于求最短路径的图中也要加上
    		dg.edges[pathIndex][pathIndexs[index]] = 1

    	})
    //console.info(g)
    //console.info(dg)
    return [{flow,path:targetPath.pathName}].concat(maxNetFlow(g,dg,sourceName,targetName))
}

function test(){
	let g = newGraph()
	//
	let dg = {
		vertexs:g.vertexs,
		edges:g.edges.map(flows=>flows.map(flow=>flow==0?max:1))
	}
	//为了模拟贪心出s->a->d->t的情况，我们设置s->a的距离和a->d的距离
	dg.edges[0][2] = 2
	dg.edges[1][3] = 2
	console.info(maxNetFlow(g,dg,'s','t'))
}
test()
