let f = (s)=>{
	let chs = [...s];
	let res = [];
	for(let i=0;i<chs.length;i++){
		let s1 = f1(chs,i);
		let s2 = f2(chs,i);
		res = res.length>=s1.length?res:s1;
		res = res.length>=s2.length?res:s2;
	}
	return res.join('');
};
/**
以i为中枢的最大回文串
*/
function f1(chs,i){
	let begin = i;
	let end = i;
	while(begin>=0&&end<chs.length){
		if(chs[begin] != chs[end]){
			break;
		}
		begin--;
		end++;
	}
	return chs.slice(begin+1,end);
}
/**
以i和i+1为中枢的最大回文串
*/
function f2(chs,i){
	let begin = i;
	let end = i+1;
	if(end>=chs.length){
		return chs.slice(begin,end);
	}
	while(begin>=0&&end<chs.length){
		if(chs[begin] != chs[end]){
			break;
		}
		begin--;
		end++;
	}
	return chs.slice(begin+1,end);
}

let s = '';
//s = 'ababb';
let res = f(s);
console.info(res);