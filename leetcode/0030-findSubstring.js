/**
30. 串联所有单词的子串
难度困难
给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。
示例 1：
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
示例 2：
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
通过次数43,936提交次数137,904
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 回溯算法
 */
var findSubstring = function(s, words) {
	if(s==''||words.length==0)return []
	let totalLen = words.map(i=>i.length).reduce((prev,curr)=>prev+curr,0)
	let wordLen = words[0].length
	let ret = []
	tryIndex(0,words.concat([]),0)
	return ret.filter(i=>i!=null)
	function tryIndex(i,ws,start){
		if(ret[start]!=null)return
		if(i+ws.length*wordLen>s.length){
			return
		}
		for(let j=0;j<ws.length;j++){
			if(s.substr(i,wordLen)==ws[j]){
				ws.splice(j,1)
				if(ws.length==0){
					//console.info(s.substr(start,totalLen))
					//tryIndex(start+1,words.concat([]),start+1)
					ret[start] = start
					break
				}else{
					tryIndex(i+wordLen,ws,start)	
				}
				
			}
		}
		tryIndex(start+1,words.concat([]),start+1)
	}
}
//双hashmap算法
findSubstring = (s,ws)=>{
	if(s==''||ws.length==0)return []
	let wordLen = ws[0].length
	if(s.length<ws.length*wordLen)return []
	let wMap = new Map()
	let word,wCount,sCount
	ws.forEach((w,i)=>{
		wCount = wMap.get(w)
		wCount = wCount==null?1:wCount+1
			wMap.set(w,wCount)
	})
	let ret = []
	for(let j=0;j<s.length-ws.length*wordLen+1;j++){
		let i,sMap = new Map()
		for(i=0;i<ws.length;i++){
			word = s.substr(j+wordLen*i,wordLen)
			sCount = sMap.get(word)
			sCount = sCount==null?1:sCount+1
			wCount = wMap.get(word)
			if(wCount==null || sCount>wCount){
				break
			}
			sMap.set(word,sCount)
		}
		if(i==ws.length){
			ret.push(j)
		}
	}
	return ret
}
//console.info(findSubstring("wordgoodbestword",["word","good","best"]))
//console.info(startsWith("abcdefxyzijk",["def","abc"]))
//console.info(findSubstring("abcdefxyzijk",["def","abc"]))
//console.info(findSubstring("barfoothefoobarman",["foo","bar"]))
//console.info(findSubstring("barfoothefoobarman",["foo","bar"]))
//console.info(findSubstring("barfoofoobarthefoobarman",["bar","foo","the"]))
//console.info(findSubstring("mississippi",["is"]))
console.info(findSubstring("wordgoodgoodgoodbestword",["word","good","best","good"]))


//console.info(findSubstring("wordgoodgoodgoodbestword",["word","good","best","good"]))

//console.info(startsWith("goodbestword",["good","best","word"]))



