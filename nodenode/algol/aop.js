/**
 * 将函数变成具有缓存功能的函数
 * 
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
 * 计时
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