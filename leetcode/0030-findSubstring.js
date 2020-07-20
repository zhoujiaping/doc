/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 TODO
 */
var findSubstring = function(s, words) {
	if(words.length==0)return []
	if(s.length<words[0].length)return []
	let indexs = []
	let len = words[0].length
	for(let k=0;k<words.length;k++){
		let curr = words[k]
		let i = -1
		while((i = s.indexOf(curr,i+1))>-1){
			let rest = words.slice(0,k).concat(words.slice(k+1))
			if(startsWith(s.substring(i+len),rest)){
				indexs.indexOf(i)<0 && indexs.push(i)
			}
		}
	}
	return indexs
};
function startsWith(s,words){
	if(words.length==0)return true
	if(s.length<words[0].length)return false
	let wordLen = words[0].length
	let len = words.length
	return words.some((word,i)=>
		s.startsWith(word)&&startsWith(s.substring(wordLen),words.slice(0,i).concat(words.slice(i+1))))
}
/**
上面的算法没有考虑性能，导致运行超时。
*/
findSubstring = (s,words)=>{
	if(words.length==0)return []
	if(s.length<words[0].length)return []
	let indexs = []
	let wordLen = words[0].length
	let j=0
	//遍历所有单词
	for(let i=0;i<words.length;i++){
		j = -1//s的当前下标
		do{
			j = s.indexOf(words[i],j+1)
			if(j<0){
				continue
			}//剩余单词	
			let ws = words.slice(0,i).concat(words.slice(i+1))
			let sub,j1=j+wordLen
			while(ws.length>0){
				sub = s.substr(j1,wordLen)//s下一组字符
				let k = ws.indexOf(sub)//如果能在剩余单词中找到
				if(k<0)break 
				ws.splice(k,1)//剩余单词中去掉被找到的单词
				j1+=wordLen
			}
			if(ws.length==0 && indexs.indexOf(j)<0){
				indexs.push(j)
			}		
		}while(j>=0)
	}
	return indexs
}
/**
很明显，如果不考虑空间和时间复杂度，可以直接用穷举法。
实际上数据量大一点这样是不行的。
可以考虑回溯算法
*/
findSubstring = (s,words)=>{

}
//console.info(findSubstring("wordgoodbestword",["word","good","best"]))
//console.info(startsWith("abcdefxyzijk",["def","abc"]))
//console.info(findSubstring("abcdefxyzijk",["def","abc"]))
console.info(findSubstring("barfoothefoobarman",["foo","bar"]))
//console.info(findSubstring("wordgoodgoodgoodbestword",["word","good","best","good"]))

//console.info(startsWith("goodbestword",["good","best","word"]))



