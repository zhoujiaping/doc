const hash = {};//
const array = [];//

function insert(val){
	let prev = hash[val];
	let ele = {
		val:val,prev:prev,index:array.length
	};
	hash[val] = ele;
	array[array.length] = ele;
	if(prev!=null){
		prev.next = ele;
	}
	return prev==null;
}

function remove(val){
	let ele = hash[val];
	if(ele == null){
		return false;
	}
	let last = array.length - 1;
	let prev = hash[val] = ele.prev;
	if(prev!=null){
		prev.next = null;
	}
	array[ele.index] = array[last];
	array[last].index = ele.index;
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
insert(1);*/

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
