/**
 * AC自动机
 *http://www.cnblogs.com/huangxincheng/archive/2012/12/02/2798317.html
 *https://blog.csdn.net/creatorx/article/details/71100840
 */
const aCode = 'a'.charCodeAt(0);
function toArray(root){
	//console.info(root.fail);
	let arr = [{
		id:root.id,
		fail:root.fail.id,
		value:null,
		sum:null
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
					fail:node.fail.id,
					value:String.fromCharCode(aCode+i),
					sum:node.sum
				});
			}
		}
	}
	arr.sort((o1,o2)=>o1.id-o2.id);
	return arr;
}
function newTrie(){
    let id = 0;
    let root = {
            next:new Array(26),
            id:id,
            fail:null
    };
    return {
        insert(str){//构建朴素trie树
            let p = root;
            for(let i=0;i<str.length;i++){
                let x = str.charCodeAt(i) - aCode;
                if(p.next[x]===undefined){
                    id++;
                    p.next[x] = {
                            sum:0,
                            fail:null,
                            next:new Array(26),
                            id:id
                    };
                    //p.next.length=Math.max(p.next.length,x);
                }
                p = p.next[x];
            }
            p.sum++;
            //console.info(JSON.stringify(root));
        },
        root(){
            return root;
        },
        buildFailPointer(){//bfs(广度优先算法)构建失败指针
            let queue = [];
            queue.push(root);
            while(queue.length>0){
                let ele = queue.shift();
                let fail = null;
                for(let i=0;i<aCode;i++){
                    if(ele.next[i] == null){
                        continue;
                    }
                    if(ele==root){
                        ele.next[i].fail = root;
                    }else{
                        fail = ele.fail;
                        while(fail!=null){
                            if(fail.next[i]!=null){
                                ele.next[i].fail = fail.next[i];
                                break;
                            }
                            fail = fail.fail;
                        }
                        if(fail==null){
                            ele.next[i].fail=root;
                        }
                    }
                    queue.push(ele.next[i]);
                }
            }
            root.fail = root;
        },
        match(str){
        	let res = [];
        	let p = root;
        	let len = str.length;
        	for(let i=0;i<len;i++){
        		let x = str.charCodeAt(i) - aCode;
        		while(!p.next[x] && p!=root){
        			p = p.fail;
        		}
        		p = p.next[x];
        		if(!p){
        			p = root;
        		}
        		let temp = p;
        		while(temp != root){
        			if(temp.sum>=0){
        				res.push(temp);
        				temp.sum = -1;
        			}else{
        				break;
        			}
        			temp = temp.fail;
        		}
        	}
        	return res;
        },
        toArray(){//方便打印，去掉循环引用，将fail的值改成其指向节点的id。
        	return toArray(root);
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
    trie.buildFailPointer();
    //let array = trie.toArray();
    let res = trie.match('hellosherworld');
   /* res = res.map(item=>{
    	return toArray(item);
    });
    console.info(JSON.stringify(res,2));
    return;*/
    //console.info(JSON.stringify(res,null,2));
    //console.info(JSON.stringify(trie.root()));
    console.info(JSON.stringify(trie.toArray(),(k,v)=>{
    	/*if(k=='next'){
    		return null;
    	}
    	if(k=='fail'){
    		if(v==null){
    			return 0;
    		}
    		return v.id;
    	}else{
    		if(v==null){
        		return v;
        	}
    		return v;
    	}*/
    	return v;
    },2));
}
test();