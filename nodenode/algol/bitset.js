/**
 * Bitmap算法（java中叫BitSet，作为javascript，还是跟着java老大哥叫bitset吧）
 * http://www.cnblogs.com/huangxincheng/archive/2012/12/06/2804756.html
 */
function newBitset(){
	let buf = Buffer.alloc(10);
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