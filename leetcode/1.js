/*
I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
*/
function trans(num){
	if(num>3999){
		throw new Error('fuck u!');
	}
	let map = [
		['','I','II','III','IV','V','VI','VII','VIII','IX'],
		['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
		['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],
		['','M','MM','MMM']
	];
	let s = ''+num;
	let chs = [...s].reverse();
	let res = chs.map((item,index)=>map[index][item]).reverse().join('');
	return res;
}
(()=>{
	let num = 1994;
	console.info(trans(num));
})();