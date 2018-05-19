/**
 *kmp算法实现（nodejs版）
 *可以用来实现字符串的indexOf算法。但是官方库却不用这个算法实现字符串的indexOf。
 *比如java的String，宁愿用暴力匹配的方式。因为作者认为，通常用indexOf的场景，字符串都不大，
 *不用担心性能问题。他是对的，我们通常都不用关心indexOf的性能，如果真的有大文本查找，自己实现一个kmp就可以了。
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