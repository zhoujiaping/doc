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
    wordList.unshift(beginWord)
	let nextMap = new Map()
	wordList.forEach(w=>{
		nextMap.set(w,wordList.filter(it=>distance(w,it)==1))
	})
	//console.info(nextMap)
	let ans = []
	let root = {word:beginWord}
	bfs([root],new Set([beginWord]))
	return ans
	function bfs(nodes,visited) {
	    let size = visited.size
	    let allNextNodes = []
	    for(let node of nodes){
	        let nexts = nextMap.get(node.word)
	        let nextNodes = []
            nexts = nexts.filter(it=>!visited.has(it))
            nexts.forEach(it=>{
                let child = {word:it,parent:node}
                nextNodes.push(child)
                if(it==endWord){
                    ans.push(getPath(child))
                }
            })
            node.children = nextNodes
            allNextNodes.push(...nextNodes)
	    }
	    //已找到最短路径，停止搜索
	    if(ans.length>0)return
	    allNextNodes.forEach(it=>visited.add(it.word))
	    //没有后续路径，停止搜索
	    if(size==visited.size)return
	    bfs(allNextNodes,visited)
	};
};
function getPath(node){
    let item = []
    while(node){
        item.unshift(node.word)
        node = node.parent
    }
    return item
}
function distance(word1,word2){
	//return [...word1].map((it,i)=>it==word2[i]?0:1).reduce((prev,curr)=>prev+curr,0)
	let diff = 0
	for(let i=0;i<word1.length;i++){
	    if(word1[i]!=word2[i])diff++
	}
	return diff
}
//该方法优化后，性能提升很大，从4804ms提升到1300ms
function distance(word1,word2){
	//return [...word1].map((it,i)=>it==word2[i]?0:1).reduce((prev,curr)=>prev+curr,0)
	let diff = 0
	for(let i=0;i<word1.length;i++){
	    if(word1[i]!=word2[i])diff++
	}
	return diff
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
let beginTime = new Date().getTime()
console.info(findLadders(beginWord,endWord,wordList))
let endTime = new Date().getTime()
console.info(endTime - beginTime)