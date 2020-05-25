/**
 * 并查集
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/16/2820519.html
 */

const newUF = (list)=>{
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
(()=>{
	const uf = newUF(['java','c','python','haskell','scala','groovy','lisp'])
	uf.union('java','c')
	uf.union('python','groovy')
	uf.union('groovy','c')

	uf.union('scala','lisp','haskell')

	const java = uf.find('java')
	console.info(java)

	const c = uf.find('c')
	console.info(c)

	const python = uf.find('python')
	console.info(python)

	const scala = uf.find('scala')
	console.info(scala)
})()