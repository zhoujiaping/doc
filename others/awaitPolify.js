const log = require('./log');

/*基于nodejs api的基本规律：回调函数作为最后一个参数，回调函数的参数，第一个是err。将回调风格转换为await风格。
这种方式，完全兼容原来的回调风格，额外的可以用await风格！！！
*/
//有回调的函数
function polifyAsync(target,funcName,dataPoly){
	const origFunc = target[funcName];
	target[funcName] = function(...args){
		const len = args.length;
		//需要回调函数，但是没传回调函数，就加一个回调函数，返回一个promise
		if(len == 0 || typeof args[len-1] != 'function'){
			return new Promise((resolve,reject)=>{
				args[len] = function(err,data){
					if(err){
						reject(err);
						return;
					}
					dataPoly && dataPoly(data);
					resolve(data);
				};
				origFunc.apply(target,args);
			});
			
		}
		//需要回调函数，并且传了回调函数，就用回调函数风格
		const origCallback = args[len-1];
		args[len-1] = function(err,data){
			if(err){
				origCallback(err,null);
				return;
			}
			dataPoly && dataPoly(data);
			origCallback(null,data);
		};
		origFunc.apply(target,args);
	};
}
//无回调的函数
function polifySync(target,funcName,dataPoly){
	const origFunc = target[funcName];
	target[funcName] = function(...args){
		const data = origFunc.apply(target,args);
		dataPoly && dataPoly(data);
		return data;
	}
}

function polifyAsyncFunc(func,dataPoly){
	let newFunc = function(...args){
		const len = args.length;
		//需要回调函数，但是没传回调函数，就加一个回调函数，返回一个promise
		if(len == 0 || typeof args[len-1] != 'function'){
			return new Promise((resolve,reject)=>{
				args[len] = function(err,data){
					if(err){
						reject(err);
						return;
					}
					dataPoly && dataPoly(data);
					resolve(data);
				};
				func.apply(null,args);
			});
		}
		//需要回调函数，并且传了回调函数，就用回调函数风格
		const origCallback = args[len-1];
		args[len-1] = function(err,data){
			if(err){
				origCallback(err,null);
				return;
			}
			dataPoly && dataPoly(data);
			origCallback(null,data);
		};
		func.apply(null,args);
	};
	return newFunc;
}
module.exports = {
	polifyAsyncFunc,polifyAsync,polifySync
};