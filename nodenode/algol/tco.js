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
这段代码非常精妙！

分析 
已知，任何递归可以写成循环+栈。 
实现将任何尾递归转换成循环+栈执行而不需要针对每个尾递归函数写一个实现版本的思路。 
困难在于，任何尾递归，通用实现。而不是针对某一个递归函数。 
要点：

栈中保存的数据，正是递归函数的参数。
通用实现，那就必须依赖原来的递归函数，循环的终止条件，正是递归的结束条件。
要将递归函数的参数入栈，而不修改原来的递归函数，就必须用一个函数代替递归函数被调用，从而取得函数入参。
递归函数的终止条件，每一个递归函数都不一样，但是如果递归函数没有被再次调用，说明已达到终止条件。
即终止条件和递归函数的调用有关联。而递归函数每次调用，都会将参数入栈。所以可以根据栈中是否有元素，推断是否达到终止条件。

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
