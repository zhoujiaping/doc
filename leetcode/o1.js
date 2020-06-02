const hash = {};//val=>index 相同val最后一个的下标
const array = [];//

function insert(val){
	let prev = hash[val];//原来的val下标
	let ele = {
		val:val,prev:prev
	};
	hash[val] = array.length;
	array.push(ele);
	if(prev!=null){
		array[prev].next = hash[val];
	}
	return prev==null;
}

function remove(val){
	let index = hash[val];
	if(index == null){
		return false;
	}
	let last = array.length - 1;
	let prev = hash[val] = array[index].prev;
	if(prev!=null){
		array[prev].next = array[index].next;
	}	
	array[index] = array[last];
	let prev2 = array[index].prev;
	if(prev2!=null){
		array[prev2].next = index;
	}
	let next2 = array[index].next;
	if(next2!=null){
		array[next2].prev = index;
	}else{
		hash[array[index].val] = index;
	}
	array.length--;
	return true;
}

function random(){
	let r = Math.random()*array.length;
	return array[r|0].val;
}
function wrapPrint(fun){
	return (...args)=>{
		let res = fun(...args);
		console.info(res);
		console.info(`hash=>`);
		console.info(hash);
		console.info(`array=>`);
		console.info(array);
		return res;
	};
}
insert = wrapPrint(insert);
remove = wrapPrint(remove);
/*
insert(1);
remove(1);
insert(1);
*/
//
insert(10);
insert(10);
insert(20);
insert(20);
insert(30);
insert(30);
remove(10);
remove(10);
remove(30);
remove(30);
