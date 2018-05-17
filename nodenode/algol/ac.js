/**
本文主要内容是ac自动机的代码实现（nodejs版）。
ac自动机的应用，本文就不介绍了，百度一下你就知道。
本人在学习ac自动机算法的时候，看的网上的资料都只是按照ac自动机的实现步骤进行讲解和实现，并没有分析这种算法的推理过程，所以对于其原理理解起来比较费劲，不知道实现步骤为什么要这么做，最多只是按步骤实现代码并对代码进行结果验证。私以为，学习算法，最重要的是学习思想，而不是一个结论（虽然结论也非常重要），所以在实现了代码之后（其实对其原理，也是在敲了一遍代码之后才理解的，网上的博客看完之后根本就是一脸懵逼），思考了创造这个算法的推导过程，并将其进行总结，分享给大家，如果觉得不错，希望加个关注，谢谢。
先附上代码吧
 * AC自动机
 *http://www.cnblogs.com/huangxincheng/archive/2012/12/02/2798317.html
 *https://blog.csdn.net/creatorx/article/details/71100840
 */
//'a'的unicode码
const startCode = 'a'.charCodeAt(0);
function newTrie(){
    let id = 0;//由于trie树存在循环引用，所以加个id字段，方便将树转成数组。
    let root = {//trie的根节点
            next:[],
            id:id,
            eq:null,//等价节点的引用（即有的文章上面说的失败节点的引用，但是实际上应该叫等价节点）
            sum:-1//小于0表示不是单词结尾字符。等于0表示是单词结尾字符。
    };
    return {
        insert(str){//构建朴素trie树
            let p = root;
            for(let i=0;i<str.length;i++){
                let x = str.charCodeAt(i) - startCode;
                if(p.next[x]===undefined){
                    id++;
                    p.next[x] = {
                            sum:-1,
                            eq:null,
                            next:[],
                            id:id
                    };
                    p.next.length=Math.max(p.next.length,x);
                }
                p = p.next[x];
            }
            p.sum=0;
            p.count=0;//给单词节点添加一个计数属性，用于统计被匹配到的次数。
            //console.info(JSON.stringify(root));
        },
        root(){
            return root;
        },
        buildEqPointer(){//bfs(广度优先算法)构建失败指针
            let queue = [];
            queue.push(root);
            while(queue.length>0){
                let ele = queue.shift();
                let eq = null;
                for(let i=0;i<startCode;i++){
                    if(ele.next[i] == null){
                        continue;
                    }
                    if(ele==root){
                        ele.next[i].eq = root;
                    }else{
                        eq = ele.eq;
                        while(eq!=null){
                            if(eq.next[i]!=null){
                                ele.next[i].eq = eq.next[i];
                                break;
                            }
                            eq = eq.eq;
                        }
                        if(eq==null){
                            ele.next[i].eq=root;
                        }
                    }
                    queue.push(ele.next[i]);
                }
            }
            root.eq = root;
        },
        match(str){
        	let res = [];
        	let p = root;
        	let len = str.length;
        	for(let i=0;i<len;i++){
        		let x = str.charCodeAt(i) - startCode;
        		while(!p.next[x] && p!=root){
        			p = p.eq;
        		}
        		p = p.next[x];
        		if(!p){
        			p = root;
        		}
        		let temp = p;
        		while(temp != root){
        			temp.count = 0;//重置计数，使得match重复调用不会导致错误结果。
        			if(temp.sum>=0){
        				temp.count++;
        				res.push(temp);
        				//temp.sum++;
        			}else{
        				break;
        			}
        			temp = temp.eq;
        		}
        	}
        	return res;
        },
        toArray(){//方便打印，去掉循环引用，将eq的值改成其指向节点的id。
        	let arr = [{
        		id:root.id,
        		eq:root.eq.id,
        		value:null,
        		sum:null,
        		count:null
        	}];
        	let queue = [root];
        	while(queue.length>0){
        		let p = queue.shift();
        		for(let i=0;i<p.next.length;i++){
        			let node = p.next[i];
        			if(node!=null){
        				queue.push(node);
        				arr.push({
        					id:node.id,
        					eq:node.eq.id,
        					value:String.fromCharCode(startCode+i),
        					sum:node.sum,
        					count:node.count
        				});
        			}
        		}
        	}
        	arr.sort((o1,o2)=>o1.id-o2.id);
        	return arr;
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
    trie.buildEqPointer();
    //let array = trie.toArray();
    let res = trie.match('hellosherworld');
    res = trie.match('hellosherworld');
    console.info(JSON.stringify(trie.toArray(),(k,v)=>{
    	return v;
    },2));
}
test();
module.exports = {
		newTrie
};
/**
 * 重点来啦！！！
 * ac自动机算法怎么来的？或者说，如何根据trie推导出ac自动机算法？
 * 首先，假设你已经掌握了trie树的知识。这里并不需要你掌握trie树的优化，朴素trie树即可。
 * 如果你还没有trie树的知识，先去学习一下trie树吧，朴素trie树很简单的。
 * 进入正题
 * 有一字符串X=x0x1x2x3x4...xn(从x0到xn共n个字符组成)
 * 有m个不重复的单词W={W1,W2,W3...Wm}(为了分析方便，先假设最长的单词长度为u，u<n，得出结论之后我们就可以推广了)
 * 现在需要统计各个单词在字符串X中出现的次数
 * 我们当然可以用kmp算法循环处理m个单词，时间复杂度为O(n*m)。
 * 现在我们不用kmp算法，我们先分析。
 * 我们用S(i,j)表示从xi到xj的字符串。
 * 用穷举法，字符串X的所有子串为
 * S(0,0) =     x0
 * S(0,1) =     x0x1
 * S(0,2) =     x0x1x2
 * ...
 * S(0,u) =    x0x1x2...xu
 * ...
 * S(0,n) =     x0x1x2...xn
 * S(1,1) =         x1
 * S(1,2) =         x1x2
 * S(1,3) =         x1x2x3
 * ...
 * S(1,n) =         x1x2x3...xn
 * S(2,2) =             x2
 * S(2,3) =             x2x3
 * ...
 * S(n,n) =                                   xn
 * 由于u<n,所以能匹配到W中某个单词的串，其长度一定会小于等于u。
 * 这样，我们就过滤了一部分子串，剩余待匹配的子串为
 * S(0,0) =     x0
 * S(0,1) =     x0x1
 * S(0,2) =     x0x1x2
 * ...
 * S(0,u) =     x0x1x2...xu
 * S(1,1) =         x1
 * S(1,2) =         x1x2
 * S(1,3) =         x1x2x3
 * ...
 * S(1,u+1) =        x1x2x3...xu+1(注：u+1是下标)
 * S(2,2) =            x2
 * S(2,3) =            x2x3
 * ...
 * S(2,u+2) =       x2x3...xu+2
 * ...
 * S(n,n) =                                   xn
 * 接下来我们先承认一个事实，如果S(i,j)为字符串X的子串，那么S(i+1,j)为X的子串，
 * 换句话说，如果一个字符串为X的子串，那么该字符串去掉首字符剩余的串也为X的子串。
 * 这个事实太显而易见了，这里就不证明了。
 * 于是，就有了如下结论，
 * 如果匹配S(i,j)的时候能非常方便的匹配S(i+1,j),那么用递推的逻辑，
 * 也就能匹配S(i+2,j),S(i+3,j)...,S(j,j)。如果不能理解，就把S(i,j)换成xi到xj。
 * 接下来，我们从S(0,0)到S(n,n)逐个去匹配W。
 * 步骤为
 * 取X的第一个字符,得到S(0,0),匹配W，如果匹配则继续，否则S(0,i)都不能匹配W,下一步就直接匹配x1开头的字符串了。
 * 再取下一个字符，组成S(0,1),匹配W，那么也就对S(1,1)进行了匹配。（匹配S(i,j)的时候能非常方便的匹配S(i+1,j)的假设）
 * 再取下一个字符，组成S(0,2),匹配W，那么也就对S(1,2)进行了匹配，也就对S(2,2)进行了匹配。
 * 。。。
 * 再取下一个字符，组成S(0,u),匹配W，那么也就对S(i,u)进行了匹配，其中i>=1并且i<=u。
 * 至此，x0开头的字符串都匹配完毕。我们接下来匹配x1开头的字符串。但是注意，x1开头的字符串，此时
 * 只剩下S(1,u+1)没有匹配，我们只需要取下一个字符，组成S(1,u+1)去匹配，而不需要从x1开始取字符。
 * 以此类推，直到取完最后一个字符。在这个过程中，我们是逐个取X的字符的，并没有产生回溯的处理。
 * 接下来讨论我们的假设，即匹配S(i,j)的时候能非常方便的匹配S(i+1,j)。
 * 为了用S(i,j)匹配W，我们可以用trie树。trie树可以用来匹配单词。
 * 当S(i,j)匹配到了trie树中某个单词的时候，为了能在此时将S(i+1,j)也进行匹配，也就是看trie树中有没有S(i+1,j)这个单词，
 * 我们可以在构建trie树之后，让trie树中的S(i,j)指向S(i+1,j)即可（构建trie的等价节点）。
 * 这可以通过分类讨论（将第1层的节点单独拿出来讨论，第2层及以上的作为另一类讨论，根节点为第0层）和广度优先遍历实现。
 * 所以我们的假设是可以成立的。所以我们只需要逐个取X的字符匹配就可以了。
 * 剩下的问题，就是实现广度优先遍历trie树构建等价节点，和匹配的实现。
 * 要注意的是，匹配到一个字符串S(i,j)之后，要马上去匹配它的等价节点，以及等价节点的等价节点，即S(i+1,j),S(i+2,j)...S(j,j)。
 * 如果上面的逻辑不好理解，就用具体的值替换一些参数再试一遍。
 * 
 * 经过上面的分析，构建trie的等价节点，是一个充分条件，而不是一个别人给的硬生生的毫无道理只知道要遵守的公式。
 * 以及实现匹配函数时，要递推的匹配等价节点，而不是机械的别人告诉我们要这么实现。
 * 
 * 当然，构建trie的等价节点的时候，对于第1层节点的等价节点，由于它并不存在，所以我们可以设置它为null。
 * 但是我们发现，如果将它设置为root（根节点）,那么第1层就可以和其它层统一处理了。
 *  */