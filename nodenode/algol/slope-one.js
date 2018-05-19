/**
协同推荐SlopeOne 算法
http://www.cnblogs.com/huangxincheng/archive/2012/11/22/2782647.html
Rb = (n*(Ra-Rab)+m*(Rc-Rcb))/(m+n)
a,b,c代表商品
Ra代表商品的打分值
Rab代表A组到B组的平均差（均值化）
m,n代表人数

@Param productsScores = [
    [4,10,8,50],
    [5,12,8,48],
    [...],
    [...]
    ...
]
每一列代表每个人对某个产品的打分，每一行代表某个人对各个产品的打分。
productsScores 行数=人数
productsScores 列数=产品数
@Param targetProductScores=[3,4,4.5,4] 
代表每个人对目标产品的打分。targetProductScores.length=人数
@Param myscores = [4,9,8,50];
myscores.length=产品数
这个版本有问题：并不是每个人都用过所有的产品，有些人只用过部分产品。
*/
let slopeOne = function(productsScores,targetProductScores,myscores){
    const personAmount = productsScores.length;
    const productAmount = myscores.length;
    const factors = [];
    const f1 = i=>scores=>scores[i];
    const f2 = (score,personIndex)=>{
        //计算某个产品到目标产品的平均差
        let res = score - targetProductScores[personIndex];
        //console.info(`${i}->${personIndex} : ${res}`);
        return res;
    };
    const f3 = (prev,curr)=>{
        return prev+curr;
    };
    for(let i=0;i<productAmount;i++){//遍历产品
        let scoresOfProductI = productsScores.map(f1(i));
        //console.info(scoresOfProductI);
        let totalDiff = scoresOfProductI.map(f2).reduce(f3,0);
        let avgDiff = totalDiff/personAmount;
        let predictScore = myscores[i] - avgDiff;
        factors.push(predictScore * personAmount);
    }
    const res = factors.reduce((prev,curr)=>prev+curr,0)/(productAmount*personAmount);
    return res;
};
/**
协同推荐SlopeOne 算法
http://www.cnblogs.com/huangxincheng/archive/2012/11/22/2782647.html
Rb = (n*(Ra-Rab)+m*(Rc-Rcb))/(m+n)
a,b,c代表商品
Ra代表商品的打分值
Rab代表A组到B组的平均差（均值化）
m,n代表人数

@Param scores = [
    //[8,20]某个人对产品A打分和对目标产品的打分。
    [[8,20],[7,18],[6,19],[5,20],[8,17],[10,19],[9,22],[8.5,25],[6,20],[7.5,19]],
    //每项都是某个人对产品B打分和对目标产品的打分。
    [[],[]...],
    [...]
    ...
]
scores.length=产品数
scores[i].length=人数(每个产品的打分人数不同)
@Param myscores = [4,9,8,50];myscores.length=产品数
*/
slopeOne = function(scores,myscores){
    let total = scores.map((prod,prodIndex)=>{
        let diff = 0;
        prod.forEach(pair=>{
            diff += pair[0]-pair[1];
        });
        let res = myscores[prodIndex]*prod.length - diff;
        //console.info(res);
        return res;
    }).reduce((prev,curr)=>prev+curr,0);
    //console.info(total);
    return total/scores.map(p=>p.length).reduce((prev,curr)=>prev+curr,0);
};
function main(){
    /*let productsScores = [
        [5,10,5],
        [4,5,10]
    ];
    let targetProductScores = [10,4];
    let myscores = [4,10,5];
    const res = slopeOne(productsScores,targetProductScores,myscores);
    console.info(res);*/
    let scores = [[
        [5,10],[4,4]
    ],[
        [10,10],[5,4]
    ],[
        [5,10],[10,4]
    ]];
    let myscores = [4,10,5];
    const res = slopeOne(scores,myscores);
    console.info(res);
}
main();