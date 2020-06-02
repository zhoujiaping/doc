/*
I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
*/
function trans(roman){
	let w = {
		'I':1,
		'V':5,
		'X':10,
		'L':50,
		'C':100,
		'D':500,
		'M':1000
	};
	let s1 = null,s2 = null;
	let chs = [...roman];
	let i = 0;
	let res = [];
	while(i<chs.length){
		s1 = chs[i];
		if(i+1<chs.length){
			s2 = chs[i+1];
			if(w[s1]<w[s2]){
				res.push(w[s2]-w[s1]);
				i=i+2;
			}else{
				res.push(w[s1]);
				i++;
			}
		}else{
			res.push(w[s1]);
			i++;
		}
	}
	return res.reverse().reduce((prev,curr)=>prev+curr,0);
}
(()=>{
	let num = 'MCMXCIV';
	console.info(trans(num));
})();