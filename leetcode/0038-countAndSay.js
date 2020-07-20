/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
	if(n==1)return '1'
	return next(countAndSay(n-1))
};
//方法1
function next(s){
	let curr=s[0]
	let count=1
	let ret = ''
	for(let i=1;i<s.length;i++){
		if(curr==s[i]){
			count++
		}else{
			ret+=count+curr
			curr = s[i]
			count = 1
		}
	}
	return ret+=count+curr
}
//方法2
next = s=>{
	let reg = /(\d)\1*/,m,ret=[]
	while((m = reg.exec(s))){
		s = s.substr(m.index+m[0].length)
		ret.push(`${m[0].length}${m[0][0]}`)
	}
	return ret.join('')
}
//方法3
next = str=>str.replace(/(\d)\1*/g,it=>`${it.length}${it[0]}`)
console.info(next('1211'))
console.info(countAndSay(6))
