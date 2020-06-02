let resDict = {};
function norepeat(s){
	let chars = [...s];
	//console.info(chars);
	return f2(chars,0);
}
function f1(chars,i,dict){
	if(i>=chars.length){
		return '';
	}
	if(dict[chars[i]]!=null){
		return '';
	}
	dict[chars[i]] = i;
	let res = chars[i]+f1(chars,i+1,dict);
	return res;
}
function f2(chars,i){
//console.info(resDict);
	if(i>=chars.length){
		return '';
	}
	let r1 = f1(chars,i,{});
	let r2 = f2(chars,i+1);
	let res = r1.length>=r2.length?r1:r2;
		console.info(res);

	return res;
}

let res = norepeat('dvdf');
console.info(res);
console.info('====');
//resDict = {};
//console.info(f1(['v','d','f'],0,{}));
//console.info(resDict);