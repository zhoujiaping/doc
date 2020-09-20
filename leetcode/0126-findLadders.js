/**
126. 单词接龙 II
给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出所有从 beginWord 到 endWord 的最短转换序列。转换需遵循如下规则：
每次转换只能改变一个字母。
转换后得到的单词必须是字典中的单词。
说明:
如果不存在这样的转换序列，返回一个空列表。
所有单词具有相同的长度。
所有单词只由小写字母组成。
字典中不存在重复的单词。
你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
示例 1:
输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]
输出:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
示例 2:
输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
输出: []
解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。
通过次数23,692提交次数61,507
*/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
	let minLen = Infinity
	let nextMap = new Map()
	wordList.forEach(it=>{
		nextMap.set(it,wordList.filter(it=>distance(beginWord,it)==1))
	})
	console.info(nextMap)
	let ans =  findLadders0(beginWord,endWord,wordList,new Set()).map(it=>[beginWord].concat(it))
	return ans
	function findLadders0(beginWord, endWord, wordList, prevs) {
		if(prevs.size>=minLen)return []
		let nexts = nextMap.get(beginWord)
		if(nexts==null){
			nexts = wordList.filter(it=>distance(beginWord,it)==1)
			nextMap.set(beginWord,nexts)
		}
		nexts = nexts.filter(it=>!prevs.has(it))
		if(nexts.length==0)return []
		let ans = []
		for(let next of nexts){
			if(next == endWord){
				minLen = Math.min(minLen,prevs.size+1)
				return [[next]]
			}
			let paths = findLadders0(next,endWord,wordList,new Set([next,...prevs]))
			ans.push(...paths.map(it=>[next].concat(it)))
		}
		return ans
	};
};
function distance(word1,word2){
	return [...word1].map((it,i)=>it==word2[i]?0:1).reduce((prev,curr)=>prev+curr,0)
}
let beginWord = "hit"
let endWord = "cog"
let wordList = ["hot","dot","dog","lot","log","cog"]
//ans = [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]

//beginWord = "hit"
//endWord = "cog"
//wordList = ["hot","dot","dog","lot","log"]

//beginWord = "hit"
//endWord = "dot"
//wordList = ["hot","dot","dog","log"]

//beginWord = "qa"
//endWord = "sq"
//wordList = ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"]
//wordList = wordList.slice(0,28)
console.info(findLadders(beginWord,endWord,wordList))