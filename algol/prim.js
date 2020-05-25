/**
 * prim算法
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/12/2815214.html
 */
const max = Infinity
function prim(graph){
	//最小生成树的边
	const edges = []
	//已在最小生成树中的顶点,先将第一个顶点当做已遍历
	const visitedVertexIndexs = [0]
	//未在最小生成树中的顶点
	const unvisitedVertexIndexs = graph.vertexs.map((name,index)=>index).slice(1)
	//遍历N-1次，每次得到一条边
	graph.vertexs.slice(1).forEach(_=>{
		/*由于有3层循环，时间复杂度为O(N^3).其实查找最小边，里面有重复的计算。比如第一个顶点，每次都会比较它和其他未遍历顶点的边。
		如果某次我们找到的最小边不包含第一个顶点，那么下次找最小边的时候，实际上各顶点到第一个顶点的最小权重没有发生变化，这些信息不需要再次判断来获取。
		所以我们增加一个数据结构，维护所有节点到已遍历节点的最小边。
		prim2为优化的版本（算法复杂度增加了好多有木有，瞬间感觉kruskal算法简单多了）
		*/
		//从不在最小生成树的顶点中，找到一个和在最小生成树的顶点中权值最小的边
		let min = {from:-1,to:-1,weight:max}
		//待会儿要将找到的节点从未遍历的节点中删除
		let indexToDelete = -1
		visitedVertexIndexs.forEach(from=>{
			const weights = graph.edges[from]
			unvisitedVertexIndexs.forEach((to,toIndex)=>{
				if(from==to)return
				if(weights[to]<min.weight){
					min.from = from
					min.weight = weights[to]
					min.to = to
					indexToDelete = toIndex
				}
			})
		})
		//将找到的节点添加到已遍历的节点
		visitedVertexIndexs.push(min.to)
		//将找到的节点从未遍历的节点中删除
		unvisitedVertexIndexs.splice(indexToDelete,1)
		//将找到的边添加到最小生成树的边
		edges.push({
			from:graph.vertexs[min.from],//为了方便查看结果，取顶点的名字
			to:graph.vertexs[min.to],
			weight:min.weight
		})
	})
	return edges
}
function prim2(graph){
	//最小生成树的边
	const edges = []
	/*用于性能优化。各节点到已遍历顶点的最小边。比如假设有顶点[A,B,C,D,E,F]共6个顶点。
	[
	  { to: 0, weight: 0 },
	  { to: 0, weight: 1 },
	  { to: 0, weight: 1 },
	  { to: 2, weight: 3 },
	  { to: 0, weight: max },
	  { to: 0, weight: 1 }
	]
	第4项表示顶点D（数组下标对应第几个顶点）的到已遍历顶点的最小边为D->C，并且权重是3.
	*/
	const visitedEdges = graph.vertexs.map((name,index)=>{
		return {
			to:null,
			weight:max,
			used:false//是否已经用于最小生成树
		}
	})
	let prevTo = 0
	graph.vertexs.slice(0,-1).forEach(_=>{
		/**
		举个例子，假设有顶点[A,B,C,D,E,F]共6个顶点，已确认添加到最小生成树的顶点为A,B,D.
		最后一次找到的添加到最小生成树的顶点为D，最后一次找到的最小边为D->B。
		那么此时visitedEdges里面的信息为 所有顶点到A,B的最小边。
		要找下一个要添加的顶点及最小边，就要先确定所有顶点到A,B,D的最小边。
		事实上，上一步并没有改变除D之外其他顶点到A,B的最小边信息。
		所以，我们只需要更新D到A,B的最小边。
		*/
		visitedEdges.forEach((edge,from)=>{
			//edge为 第index个顶点到已遍历顶点的最小边。
			if(graph.edges[from][prevTo] < edge.weight){
				edge.to = prevTo
				edge.weight = graph.edges[from][prevTo]
			}
		})
		//从不在最小生成树的顶点中，找到一个和在最小生成树的顶点中权值最小的边
		let min = {from:-1,to:-1,weight:max}
		//待会儿要将找到的节点从未遍历的节点中删除
		let indexToDelete = -1
		visitedEdges.forEach((edge,from)=>{
			if(!edge.used && edge.weight>0 && edge.weight<min.weight){
				min.from = from
				min.to = edge.to
				min.weight = edge.weight
			}
		})
		prevTo = min.from
		visitedEdges[prevTo].weight *= -1
		//将找到的边添加到最小生成树的边
		edges.push({
			from:graph.vertexs[min.from],//为了方便查看结果，取顶点的名字
			to:graph.vertexs[min.to],
			weight:min.weight
		})
	})
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
	const edges = prim2(graph)
	console.table(edges)
}
test()