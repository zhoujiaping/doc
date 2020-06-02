require('./polifyAll');
const fs = require('fs');
var path = require('path')

Date.prototype.format = function(fmt='yyyy-MM-ddTHH:mm:ss'){
	var o = {
		"M+" : this.getMonth() + 1, 
		"d+" : this.getDate(), 
		"H+" : this.getHours(), 
		"m+" : this.getMinutes(), 
		"s+" : this.getSeconds(), 
		"q+" : Math.floor((this.getMonth() + 3) / 3), 
		"S+" : this.getMilliseconds()
	};
	var rst = /(y+)/.exec(fmt);
	rst && (fmt = fmt.replace(rst[1], (date.getFullYear() + '').substr(4 - rst[1].length)));
	for (let k of Object.keys(o)) {
		rst = new RegExp("(" + k + ")").exec(fmt);
		rst && (fmt = fmt.replace(rst[1], rst[1].length == 1 ? o[k]	: ('000'.substr(0, rst[1].length 	- ('' + o[k]).length) + o[k])));
	}
	return fmt;
};
Date.parse = function(str,fmt='yyyy-MM-ddTHH:mm:ss'){
	var reg = {
			year : /(y+)/,
			month:/(M+)/,
			day:/(d+)/,
			hour:/(H+)/,
			minute:/(m+)/,
			second:/(s+)/, 
			ms:/(S+)/ 
		};
		var date = new Date();

		var rst = reg.year.exec(fmt);
		var year = rst?+str.substr(rst.index,rst[1].length):null;
		date.setFullYear(year);
		
		rst = reg.month.exec(fmt);
		var month = rst?+str.substr(rst.index,rst[1].length)-1:0;	
		rst = reg.day.exec(fmt);
		var day = rst?+str.substr(rst.index,rst[1].length):1;
		date.setMonth(month,day);
		
		rst = reg.hour.exec(fmt);
		var hour = rst?+str.substr(rst.index,rst[1].length):0;
		date.setHours(hour);

		rst = reg.minute.exec(fmt);
		var minute = rst?+str.substr(rst.index,rst[1].length):0;
		date.setMinutes(minute);

		rst = reg.second.exec(fmt);
		var second = rst?+str.substr(rst.index,rst[1].length):0;
		date.setSeconds(second);

		rst = reg.ms.exec(fmt);
		var ms = rst?+str.substr(rst.index,rst[1].length):0;
		date.setMilliseconds(ms);
		
		return date;
};
Date.prototype.plusDays = function(daynum){
	var ms = this.getTime() + daynum * 24 * 60 * 60 * 1000;
	var newdate = new Date();
	newdate.setTime(ms);
	return newdate;
}
Date.prototype.plusMonths = function(monthnum){
	const newdate = new Date(this);
	newdate.setMonth(newdate.getMonth()+monthnum);
	return newdate;
}

Date.prototype.plusMinutes = function(minutenum){
	var ms = this.getTime() + minutenum * 60 * 1000;
	var newdate = new Date();
	newdate.setTime(ms);
	return newdate;
}

Date.prototype.atStartOfWeek = function(){
	return howso.plusDays(this,-this.getDay());
};
Date.prototype.atStartOfMonth = function(){
	return howso.plusDays(this,1-this.getDate());
};
Date.prototype.atStartOfQuarter = function(){
	const month = this.getMonth();//0~11
	const r = Math.floor(month/3);
	const newdate = new Date();
	newdate.setTime(this.getTime());
	newdate.setMonth(r*3);
	return newdate;
};
Date.prototype.atStartOfHalfYear = function(){
	const month = this.getMonth();//0~11
	const r = Math.floor(month/6);
	const newdate = new Date();
	newdate.setTime(this.getTime());
	newdate.setMonth(r*6);
	return newdate;
}
Date.prototype.atStartOfYear = function(){
	const newdate = new Date();
	newdate.setTime(this.getTime());
	newdate.setMonth(0);
	return newdate;
}

String.prototype.toUnderline = function(name){
	let chars = [...name];
	let newchars = [];
	chars.forEach(ch=>{
		if(ch>='A' && ch<='Z'){
			newchars.push('_');
			newchars.push(ch.toLowerCase());
		}else{
			newchars.push(ch);
		}
	});
	return newchars.join('');
}
String.prototype.toCamel =function(name){
	if(name==null){ 
		return null; 
	} 
	let array = name.toLowerCase().split("_");
	if(array.length==1){
		return name;
	}
	for(let i=1;i<array.length;i++){
		array[i] = array[i].substring(0, 1).toUpperCase()+array[i].substring(1);
	}
	return array.join(''); 
}
_ = {};
_.projectPath = (()=>{
    let cd = __dirname;
    for(let i=0;i<10;i++){
        if(fs.existsSync(`${cd}/package.json`)){
            return cd;
        }
        cd = path.resolve(cd, '..');
    }
    throw new Error('没有找到package.json');
})();
/**
 * 将js对象的key=value方式转为http请求参数的key=value方式。 js中的value支持对象，数组，基本类型（数值、字符串，布尔），
 * 但是http请求参数支持数值，字符串，布尔。 在和后端springmvc参数注入配合时，会出现问题。
 * 所以需要一个转换的方法。避免后端手动调用json库进行解析。 放在前端进行更方便，因为后端需要手动指定类型，前端是动态类型，封装一个方法就够了。
 */
_.toFromParam = (function(){
	function serialize(key, value, param) {
		if(Array.isArray(value)) {
			for(let i = 0; i < value.length; i++) {
				serialize(key + '[' + i + ']', value[i], param)
			}
		} else if(value != undefined && value.constructor === Object) {
			for(let k in value) {
				serialize(key + '.' + k, value[k], param);
			}
		} else {
			param[key] = value;
		}
	}
	function serializeObj(obj) {
		const param = {};
		for(let k in obj) {
			serialize(k, obj[k], param);
		}
		return param;
	}
	return serializeObj;
})();
module.exports = _;