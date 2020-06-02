/*
https://blog.csdn.net/jeffleo/article/details/53349825
*/
let max = Infinity;
function newGraph(){
	return {
		vertexs:['a','b','c','d','e','f','g'],
		edges:[
			[0,12,max,max,max,16,14],
			[12,0,10,max,max,7,max],
			[max,10,0,3,5,6,max],
			[max,max,3,0,4,max,max],
			[max,max,5,4,0,2,8],
			[16,7,6,max,2,0,9],
			[14,max,max,max,8,9,0]
		]
	};
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
function floyd(g){
	let d = g.edges.map(item=>item.map(i=>i));
	//console.info(d);
	//let p = g.edges.map((row,i)=>row.map((col,j)=>null));
	let p = g.edges.map((row,i)=>row.map((col,j)=>j));
	console.info(p);
	/*为什么顺序必须是最外层遍历中间点，然后是起点，最后是终点？
	https://www.zhihu.com/question/30955032
	*/
	for(let k=0;k<g.edges.length;k++){//遍历所有中间点
		for(let i=0;i<g.edges.length;i++){//遍历所有起点
			for(let j=0;j<g.edges.length;j++){//遍历所有终点
				if(d[i][j] > d[i][k] + d[k][j]){
					d[i][j] = d[i][k] + d[k][j];
					p[i][j] = p[i][k];
					//p[i][j] = k;
					//console.info(`i=${i},j=${j},k=${k}`);
					//console.info(p);
				}
			}
		}
	}
	console.info(d);
	console.info(p);
	return {d,p};
}
//不包含终点的路径
function path(p,i,j){
	let k = p[i][j];
	if(k !== null){
		let pik = path(p,i,k);
		let pkj = path(p,k,j);
		return pik.concat(pkj);
	}else{
		return [i];
	}
}
function test(){
	let g = newGraph();
	let {d,p} = floyd(g);
	//根据p计算0到4的最短路径
	let i = 0,j = 4;
	
	/*
	let pij = path(p,i,j);
	pij.push(j);*/
	
	let k = p[i][j];
	let pij = [i,k];
	while(k != j){
		k = p[k][j];
		pij.push(k);
	}
	console.info(pij);
}
test();