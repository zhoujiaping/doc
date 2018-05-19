/**
 *kmp算法实现（nodejs版）
 */
function calcNext(word){
	let k = -1;
	let j = 0;
	let next = [];
	next[0] = -1;
	while(j<word.length-1){
		if(k==-1 || word[k]==word[j]){
			next[++j] = ++k;
		}else{
			k = next[k];
		}
	}
	return next;
}
function Matcher(word){
	let next = calcNext(word);
	return {
		match(content){
			let i = 0;
			let j = 0;
			while(i<content.length&&j<word.length){
				if(j==-1||content[i]==word[j]){
					i=i+1;
					j=j+1;
				}else{
					j = next[j];
				}
			}
			if(j==word.length){
				return i-word.length;
			}
			return -1;
		}
	};
}
function test(){
	let word = 'avril';
	let matcher = Matcher(word);
	let res = matcher.match('hello avril lavigne');
	console.info(res);
}
test();
module.exports = {
		Matcher
};