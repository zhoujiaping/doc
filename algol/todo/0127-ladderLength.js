/**
127. 单词接龙
给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

每次转换只能改变一个字母。
转换过程中的中间单词必须是字典中的单词。
说明:

如果不存在这样的转换序列，返回 0。
所有单词具有相同的长度。
所有单词只由小写字母组成。
字典中不存在重复的单词。
你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
示例 1:

输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出: 5

解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
     返回它的长度 5。
示例 2:

输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: 0

解释: endWord "cog" 不在字典中，所以无法进行转换。
通过次数60,612提交次数138,989
*/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    let targetDiff = distance(beginWord,endWord)
    let wordsList = [],diff
    wordList.forEach(w=>{
    	diff = distance(beginWord,w)
    	if(wordsList[diff]==null)wordsList[diff]=[]
    	wordsList[diff].push(w)
    })
    //console.info(wordsList)
    if(wordsList!=null && wordsList.indexOf(beginWord)>-1)return 0

 	function nextWords(word,words,row){
 		
 	}
};
function distance(word1,word2){
	return [...word1].map((it,i)=>it==word2[i]?0:1).reduce((prev,curr)=>prev+curr)
}
let beginWord = "hit"
let endWord = "cog"
let wordList = ["hot","dot","dog","lot","log","cog"]
ladderLength(beginWord,endWord,wordList)