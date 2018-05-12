/**
 * 
在学习数据结构和算法的时候，我们都知道所有的递归都是可以优化成栈+循环的。 
对于特定的递归函数，一般我们都是手动对它们进行优化的。 
在学习scala的时候，接触到尾递归的概念。我们只要将递归写成尾递归方式，编译器会自动帮助我们优化。 
ps:并不是所有的递归都可以改写成尾递归 
在js中，尾递归通常会被解释器优化。然而，并不是所有的js解释器都支持尾递归优化。 
对于不支持尾递归优化的环境，我们需要手动将递归优化成栈+循环。 
这里实现了一个通用的方法，将尾递归优化成栈+循环。 
代码摘自阮一峰的《ECMAScript入门》这本书。 
具体代码如下
 */
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];
    return function accumulator() {
        accumulated.push(arguments);
        if(!active) {
            active = true;
            while(accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}
var sum = tco(function(x, y) {
    if(y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
});
let res = sum(1, 5);
console.info(res);
