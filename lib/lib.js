//实现尾递归优化的函数,从ECMAScript6入门这本书里面抄的
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
    let value
    let active = false
    let accumulated = []
    return function accumulator() {
        accumulated.push(arguments)
        if(!active) {
            active = true
            while(accumulated.length) {
                value = f.apply(this, accumulated.shift())
            }
            active = false
            return value
        }
    }
}
/**
 * 将函数变成具有缓存功能的函数
 * @param func 一个函数
 * @return 函数
 *
 * eg:
 * 原来的方式
 * let res = myfunc(args);
 * 现在的方式
 * let cacheablefunc = newCache().wrap(myfunc);
 * let res = cacheablefunc(args);
 * 有什么用呢？在实现动态规划算法时，由于存在递归函数调用，
 * 并且大量的函数调用是相同的，如果能将结果缓存起来，
 * 那么整个计算的性能将会有极大的提升。
 * 比如求两个字符串的最长公共子序列，求两个字符串的最小编辑距离。
 * 其实，只要是纯函数，并且其执行时间比较可观，执行频率比较多，那么就适合用这个函数。
 * 网上的代码，在实现最长公共子序列的求解时，一般都会考虑到优化。
 * 但是他们优化的方式，都是创建数组保存执行结果。对于每一个需要优化的场景，
 * 都需要实现一次，并且实现细节和具体的场景相关。
 * 私以为，使用这种方式实现更好。
 * 1、已经写完的算法，不用再去修改。因为一旦修改，又要测试。用aop方式无侵入性。
 * 2、aop方式很通用，不管是求最长公共子序列还是求最小编辑距离，只要是符合条件都可以用。优化过程一次搞定。
 * 3、基于这个思想，我们还可以给函数添加计时等功能。
 * */
function cache(func,keyGenerator){
    const cache_ = new Map()
    const wrapper = function(...args){
        let key = keyGenerator?keyGenerator(...args):JSON.stringify(args)
        if(cache_.has(key)){
            return cache_.get(key)
        }else{
            let value = func(...args)
            cache_.set(key,)
            return value
        }
    }
    wrapper.clear = ()=>cache_.clear()
    return wrapper
}
/**
 * 将函数变成具有计时功能的函数
 */
function stopWatch(func){
    let costTime = -1
    const wrapper = function(...args){
        const begin = Date.now()
        const res = func(...args)
        const end = Date.now()
        costTime = end-begin
        return res
    }
    wrapper.time = ()=>costTime
    return wrapper
}
