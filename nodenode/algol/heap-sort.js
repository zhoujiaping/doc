/**
 * 堆排序
 */
const {newHeap} = require('./heap');
function test(){
	let heap = newHeap((o1,o2)=>o1-o2);
	heap.add(3);
	console.info(heap.nodes);
	heap.add(2);
	console.info(heap.nodes);
	heap.add(5);
	console.info(heap.nodes);
	heap.add(6);
	console.info(heap.nodes);
	heap.add(1);
	console.info(heap.nodes);
	heap.add(-2);
	console.info(heap.nodes);
	heap.add(4);
	console.info(heap.nodes);
	let res = [];
	while(heap.size()>0){
		res.push(heap.pop());
		console.info(heap.nodes);
	}
	console.info(res);
}
test();
//node --inspect-brk heap-sort.js
