/*
I ���Է��� V (5) �� X (10) ����ߣ�����ʾ 4 �� 9��
X ���Է��� L (50) �� C (100) ����ߣ�����ʾ 40 �� 90�� 
C ���Է��� D (500) �� M (1000) ����ߣ�����ʾ 400 �� 900��
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