/**
123. 买卖股票的最佳时机 III
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
示例 1:
输入: [3,3,5,0,0,3,1,4]
输出: 6
解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
示例 2:
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3:
输入: [7,6,4,3,1] 
输出: 0 
解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
通过次数56,817提交次数124,626
*/
/**
 * @param {number[]} prices
 * @return {number}
 dp[i][j]:第i天到第j天一次买卖最大收益
 dp[i][j] = 
 */
Array.prototype.getAt = function(i){
	return this[i<0?i+this.length:i]
}
Array.prototype.setAt = function(i,v){
	this[i<0?i+this.length:i] = v
}
var maxProfit = function(prices) {
	let buy = [Infinity],sale = []
	for(let price of prices){
		//买入
		if(buy.length>sale.length){
			if(price<buy.getAt(-1)){
				buy.setAt(-1,price)
			}else{
				sale.push(price)
			}
		}else if(price>=sale.getAt(-1)){//卖出
			sale.setAt(-1,price)
		}else{
			buy.push(price)
		}
	}
	if(sale.length<=2)return sale.map((salePrice,i)=>salePrice-buy[i]).reduce((prev,curr)=>prev+curr,0)
	let part1,part2,max = 0
	for(let i=0;i<sale.length;i++){
		max = Math.max(max,maxProfitOne(buy,sale,0,i+1)+maxProfitOne(buy,sale,i+1))
	}
	return max
};
//一次买入卖出最大收益
function maxProfitOne(buy,sale,from=0,to=sale.length) {
	let minPrice = Infinity
	let profit = 0
	for(let j=from;j<to;j++){
		if(buy[j] - minPrice<0){
			minPrice = buy[j]
		}
		if(sale[j]-minPrice>profit)profit = sale[j]-minPrice
	}
	return profit
};
let prices = [3,3,5,0,0,3,1,4]
//prices = [1,2,3,4,5]
//prices = [7,6,4,3,1] 
console.info(maxProfit(prices))