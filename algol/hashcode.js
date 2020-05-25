/*
java的int类型占4个字节。在计算字符串的hashcode时，可能会溢出。这种溢出属于正常情况。
在js中，所有数字都是以64位浮点数形式储存。其表示范围要远远超过java32位的int。某些运算只有整数才能完成，此时 js 会自动把64位浮点数，转成32位整数，然后再进行运算。

有什么用呢？
* 更深入理解java字符串的hashCode方法
* 理解数值计算的溢出处理
* 连接js和java字符串处理

java字符串的hashCode方法
public int hashCode() {
        int h = this.hash;
        if (h == 0 && this.value.length > 0) {
            this.hash = h = this.isLatin1() ? StringLatin1.hashCode(this.value) : StringUTF16.hashCode(this.value);
        }

        return h;
    }
js实现字符串的hashCode方法
*/
String.prototype.hashCode = function(){
	//如果已经缓存了结果，直接返回
    if(this.hashcode!==undefined){
        return this.hashcode
    }
    let hashcode = 0
    for(let i=0;i<this.length;i++){
    	//溢出需要每次运算后立即处理，否则可能超过js数值的表示范围。
        hashcode = hashcode*31+this.charCodeAt(i)
        hashcode &= 0xffffffff
    }
    this.hashcode = hashcode
    return hashcode
}
console.info('a'.hashCode())
console.info('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'.hashCode())//-1535507039
console.info('aaaaaa'.hashCode())//-1425372064
console.info('aaaaa'.hashCode())