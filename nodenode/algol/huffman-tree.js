const {newHeap} = require('./heap');
/**
 * 赫夫曼树
 * 这个学信息论的时候学过
 * 可以用来实现文件压缩
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/09/2809993.html
 * 
 * 为什么用最小堆而不用其他方式排序？因为我们只需要最小的两个元素，其他元素之间的顺序并不关心，这样少了很多操作，性能上有优势。
 */
//用来进行位运算，将低位置零。
/*const bits = [0,0b10000000,0b11000000,0b11100000,0b11110000,
              0b11111000,0b11111100,0b11111110,0b11111111];*/
const bits = [0,0x80,0xc0,0xe0,0xf0,0xf8,0xfc,0xfe,0xff];

let newHuffmanTree = function(buf){
	let counter = {};//统计各字符出现次数
	buf.forEach(i=>{
		counter[i]==null?counter[i]=1:counter[i]++;
	});
	let heap = newHeap((o1,o2)=>o2.weight-o1.weight);
	Object.keys(counter).forEach(c=>{
		heap.add({//叶子节点
			value:c,
			weight:counter[c]
		});
	});
	while(heap.size()>1){
		let first = heap.pop();
		let second = heap.pop();
		let node = {//非叶子节点
				left:first,
				right:second,
				weight:first.weight+second.weight
		};
		heap.add(node);
	}
	let root = heap.pop();
	root.codes = function(){
		let buf = Buffer.alloc(4);
		let res = {};
		huffmanCode(root,buf,0,res);
		return res;
	};
	root.encode = function(){
		
	};
	return root;
}


/**
 * 用缓冲区和其中位使用的个数表示其编码
 * @param node 待处理的节点
 * @param buf 待处理节点的编码值保存在的缓冲区，每一个字节从高位开始。
 * @param len 待处理节点的编码值的比特数
 * 例如 假如a的huffman编码为10，那么保存到缓冲区就是0b00
 */
function huffmanCode(node,buf,len,res){
	if(node.left==null){//如果有左节点，就必然有右节点。
		let byte = len>>3;
		let bit = len-(byte<<3);
		let newBuf = Buffer.alloc(byte+1);
		buf.copy(newBuf);
		newBuf[byte] = newBuf[byte] & bits[len];
		res[node.value] = {
			value:String.fromCharCode(node.value),
			buf:newBuf,
			len
		};
		//console.info(res[node.value]);
		return;
	}
	len = len + 1;
	let byte = len>>3;//字节数,相当于len/8取整
	let bit = len-(byte<<3);//相当于len%8
	buf[byte] = buf[byte] & (~(0x80>>(bit-1)))
	huffmanCode(node.left,buf,len,res);
	buf[byte] = buf[byte] | (0x80>>(bit-1))
	huffmanCode(node.right,buf,len,res);
}
function test(){
	let data = Buffer.from('abcdefgabcdefabcdeabcdabcaba');
	//console.info(data);
	let huffman = newHuffmanTree(data);
	//console.info(JSON.stringify(huffman,null,2));
	//1 压缩
	//生成 每个字符的编码 如a的编码为0
	//根据huffman的字符集编码，对输入的数据进行编码
	//输出huffman编码后的数据
	//2 解压缩
	//循环读取位，并且根据其结果去搜索huffman树，直到找到某个字符，然后循环这个过程。这些字符就是解码的结果。
	//console.info(JSON.stringify(res,null,2));
	let codes = huffman.codes();
	console.info(codes);
	console.info('=========');
	//
	let res = Buffer.alloc(data.length);
	let byte = 0;//当前字节索引
	let curBits = 0;//当前字节已使用比特数
	let totalBits = 0;
	for(let item of data){
		let code = codes[item];
		//console.info(code);
		if(code.buf.length==1){
			if(code.len+curBits<8){
				res[byte] = res[byte] | (code.buf[0]>>curBits);
				curBits = code.len+curBits;
				console.info(res);
			}else{
				res[byte] = res[byte] | (code.buf[0]>>curBits);
				byte++;
				res[byte] = res[byte] | (code.buf[0]<<(8-curBits));
				curBits = code.len+curBits-8;
				console.info(res);
			}
		}else{//code.buf.length>1//如果是多字节编码
			//TODO 
		}
		totalBits+=code.len;
	}
	console.info(res);
}
test();
module.exports = {
		newHuffmanTree
};