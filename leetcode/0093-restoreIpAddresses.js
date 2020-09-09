/**
有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

示例 1：

输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
示例 2：

输入：s = "0000"
输出：["0.0.0.0"]
示例 3：

输入：s = "1111"
输出：["1.1.1.1"]
示例 4：

输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
示例 5：

输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

提示：
0 <= s.length <= 3000
s 仅由数字组成
通过次数78,120提交次数157,702

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/restore-ip-addresses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {string} s
 * @return {string[]}
 回溯
 解空间，长度（0,0,0,rest）,(0,0,1,rest),(0,0,2,rest),(0,0,3,rest)
 			（0,1,0,rest）,(0,1,1,rest),(0,1,2,rest),(0,1,3,rest)
 			（0,2,0,rest）,(0,2,1,rest),(0,2,2,rest),(0,2,3,rest)
 			（0,3,0,rest）,(0,3,1,rest),(0,3,2,rest),(0,3,3,rest)
 			...
 */
var restoreIpAddresses = function(s) {
	return trySplit(s,1)
	function trySplit(s,partsNum){
		if(partsNum==4){
		    if(s=='' || s>255 || (s.length>1&&s[0]=='0')){
		        return []
		    }else{
		        return [s]
		    }
		}
		let ans = []
		for(let i=1;i<=3;i++){
		    let part = s.substr(0,i)
		    if(part>255 || part.length>1&&part[0]=='0')continue
		    trySplit(s.substr(i),partsNum+1).forEach(it=>ans.push(part+'.'+it))
		}
		return ans
	}
};
let s = "101023"
console.info(restoreIpAddresses(s))