/**
 * trie树（字典树，前缀树，键树）
 https://blog.csdn.net/hyman_yx/article/details/54410619
 https://blog.csdn.net/jiutianhe/article/details/8076835
 朴素trie树,字符集a-z
 这种结构，空间复杂度真的恐怖。一般不直接使用，而是使用其优化版本double array trie。
 */
//'a'的unicode码
const startCode = 'a'.charCodeAt(0);
function newTrie(){
    let root = {//trie的根节点
            next:[],
            sum:-1//小于0表示不是单词结尾字符。等于0表示是单词结尾字符。
    };
    return {
        insert(str){//构建朴素trie树
            let p = root;
            for(let i=0;i<str.length;i++){
                let x = str.charCodeAt(i) - startCode;
                if(p.next[x]===undefined){
                    p.next[x] = {
                            sum:-1,
                            next:[]
                    };
                    p.next.length=Math.max(p.next.length,x);
                }
                p = p.next[x];
            }
            p.sum = 0;
        },
        root(){
            return root;
        },
        /**
         * 如果不匹配，则返回-2，如果匹配到单词，返回0，如果匹配到前缀，则返回-1
         */
        match(str){
        	let p = root;
        	let len = str.length;
        	for(let i=0;i<len;i++){
        		let x = str.charCodeAt(i) - startCode;
        		if(!p.next[x]){
        			return -2;
        		}
        		p = p.next[x];
        	}
        	return p.sum;
        }
    };
}
function test(){
    let trie = newTrie();
    trie.insert('her');
    trie.insert('say');
    trie.insert('she');
    trie.insert('she');
    trie.insert('she');
    trie.insert('shr');
    let res = trie.match('shr');
    console.info(res);
}
test();
module.exports = {
		newTrie
};
