/**
 * 将函数变成具有缓存功能的函数
 * @param func 一个函数
 * @return 函数
 * 
 * eg:
 * 原来的方式
 * let res = myfunc(args);
 * 现在的方式
 * let cacheablefunc = cache(myfunc);
 * let res = cacheablefunc(args);
 * 有什么用呢？在实现动态规划算法时，由于存在递归函数调用，
 * 并且大量的函数调用是相同的，如果能将结果缓存起来，
 * 那么整个计算的性能将会有极大的提升。
 * 比如求两个字符串的最长公共子序列，求两个字符串的最小编辑距离。
 * 其实，只要是纯函数，并且其执行时间比较可观，执行频率比较多，那么就适合用这个函数。
 * 网上的代码，在实现最长公共子序列的求解时，一般都会考虑到优化。
 * 但是他们优化的方式，都是创建数组保存执行结果。对于每一个需要优化的场景，
 * 都需要实现一次，并且实现细节和具体的场景相关。
 * 私以为，使用aop方式实现更好。
 * 1、已经写完的算法，不用再去修改。因为一旦修改，又要测试。用aop方式无侵入性。
 * 2、aop方式很通用，不管是求最长公共子序列还是求最小编辑距离，只要是符合条件都可以用。优化过程一次搞定。
 * 3、基于这个思想，我们还可以给函数添加计时等功能。
 * */
function cache(func){
	let mycache = cache.cache;
	if(mycache===undefined){
		mycache = cache.cache = {};
	}else{
		let curFuncName = cache.funcName;
		if(curFuncName!==func.name){
			cache.cache = {};
			cache.funcName = func.name;
		}
	}
	return function(...args){
		let key = JSON.stringify(args);
		if(mycache[key]!==undefined){
			//console.info(`get value form cache, mycache[${key}]=${mycache[key]}`);
			return mycache[key];
		}else{
			mycache[key] = func(...args);
			return mycache[key];
		}
	};
}
cache.clear = function(){
	cache.cache = {};
};

/**
 * 将函数变成具有计时功能的函数
 * @param func 函数
 * @return 函数
 * eg：
 * 原来的方式
 * let res = myfunc(args);
 * 现在的方式
 * let timeablefunc = time(myfunc);
 * let res = timeablefunc(args);
 * console.info(time.costTime);//打印myfunc执行的毫秒数
 * */
const time = function(func){
	return function(...args){
		const begin = Date.now();
		const res = func(...args);
		const end = Date.now();
		time.costTime = end-begin;
		return res;
	};
};
/**
 * 组合多个aop函数
 * */
function compose(func,...wraps){
	for(let wrap of wraps){
		func = wrap(func);
	}
	return func;
}
module.exports = {cache,time,compose};