/**
 * 位图的数据结构，第一次接触是在做sql优化的时候。当时用的postgresql数据库。
 * 它里面有个位图索引。比如有个列，它的取值是个枚举类型的某个值。
 * 假如这个枚举类型有10个值，那么用位图索引，最大可以提升10倍的性能。
 * 另外，位图还可以用来做不重复的正整数排序（时间复杂度为O(n)，比快速排序还快），
 * 快速判断一个整数数组中是否有重复的值。
 * 位图的思想，就是将元素的值、和二进制位的位置作映射，用二进制的值0或者1表示元素是否存在。
 * 实际上是一种特殊的哈希算法。
 * Bitmap算法（java中叫BitSet，作为javascript，还是跟着java老大哥叫bitset吧）
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/06/2804756.html
 */
/**
 * 如果缓冲区不够大，就申请新的缓冲区，并且将旧的缓冲区内容拷贝到新的缓冲区。
 * 所以为了性能，最好在创建的时候传入最大值，或者第一次调用set时传入最大值。
 */
function resizeBuf(buf,size){
		let newSize = buf.length;
		if(newSize>=size){
			return buf;
		}
		while(newSize<size){
			newSize = newSize<<1+1;
		}
		let newBuf = Buffer.alloc(newSize);
		buf.copy(newBuf,0,buf.length);
		return newBuf;
	}
function newBitset(size=10){
	let buf = Buffer.alloc(size);
	return {
		set(n){
			if(n<1){
				throw new Error('n必须大于等于1');
			}
			let i = n>>3;//n除以8取整
			buf = resizeBuf(buf,i);
			let r = n&0x07;//n除以8取余
			r = 1<<r;//余数 设置 字节对应的位为1
			console.info(i);
			buf[i] = buf[i]|r;
		},
		clear(n){
			if(n==undefined){
				buf.fill(0);
				return;
			}
			if(n<1){
				throw new Error('n必须大于等于1');
			}
			let i = n>>3;
			buf = resizeBuf(buf,i);
			let r = n&0x07;
			r = ~(1<<r);
			buf[i] = buf[i]&r;
		},
		get(n){
			if(n<1){
				throw new Error('n必须大于等于1');
			}
			let i = n>>3;
			let r = n&0x07;
			r = 1<<r;//00001000
			return !!(buf[i]&r);
		},
		buf(){
			return buf;
		}
	};
}
function test(){
	let bitset = newBitset();
	bitset.set(100);
	bitset.set(90);
	//bitset.clear();
	bitset.clear(99);
	console.info(bitset.buf());
	console.info(bitset.get(100));
	console.info(bitset.get(90));
	console.info(bitset.get(99));
	//console.info(bitset.get(0));
	//console.info(bitset.get(-1));
}
test();
module.exports = newBitset;