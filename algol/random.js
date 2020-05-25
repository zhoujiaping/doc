/**
模拟随机数生成器
*/
const M = 1<<31-1
const A = 48271
//const C = 13
const Q = (M/A)|0
const R = M%A
function newRandom(seed=new Date().getTime()){
	let x = seed
	return {
		//防溢出处理
		next: function(){
			x = A*(x%Q)-R*((x/Q)|0)
			if(x<0){
				x += M
			}
			return x
		},
		/*
		next: function(){
			x = A*x%M
			return x
		}*/
	}
}

const random = newRandom()
for(let i=0;i<30;i++){
	console.info(random.next())	
}
