# 第一章 引论
## 1.1 本文目的
复习常用数据结构和算法,总结常用算法思想.

本文内容,大多参考"数据结构与算法分析_Java语言描述Mark Allen Weiss第2版中文版.pdf"这本书.
## 1.2 环境和语言
本文所有算法使用javascript.因为它灵活,代码量少,执行环境非常轻量.
在windows,linux上安装非常容易(或者放在html里面引入,在浏览器里面执行),编辑源代码只需要一个文本编辑器即可.
## 1.3 数学知识复习
### 1.3.1 指数
- ```(x^a)*(x^b)=x^(a+b)```
- ```x^a/x^b=x^(a-b)```
- ```(x^a)^b=x^(a*b)```
- ```2^n+2^n=2^(n+1)```

### 1.3.2 对数
- ```x^a=b <=> log(x,b)=a```
- ```log(a,b)=log(c,b)/log(c,a);a>0,b>0,c>0,a!=1,b!=1```
- ```log(n,a*b)=log(n,a)+log(n,b)```

### 1.3.3 级数
- sum([1,2,..2^n]) = 2^(n+1)-1

### 1.3.4 模运算
- 如果n%(a-b)==0,那么a与b模n同余.

### 1.3.5 证明的方法
- 数学归纳法,先证明基准情形(k=1时命题成立),再假设对于1到k命题都成立,根据前后项关系,推出对于k+1命题也成立.
(自己证明一下sum([1^2,2^2,3^2,..n^2])==n*(n+1)*(2n+1)/6)
- 反例证明,找到一个不符合命题的例子.
- 反证法.先假设命题不成立,然后基于命题不成立推导得到自相矛盾的结果.

# 第二章 算法分析
## 2.1 大O表示法
表示增长速率.
## 2.2 模型
假设计算机的加法,减法,乘法,除法,赋值,比较操作都花费一个时间单位.
## 2.3 要分析的问题
执行算法花费的时间,耗费的内存,与输入数据的大小之间的关系.
一些约定:公式中存在高阶项的因子时,可以抛弃低阶项.公式中只有有限项时,可以抛弃常数项.
## 2.4 一般法则
- for循环,时间复杂度最多为O(n).
- 两层嵌套for循环,时间复杂度最多为O(n^2).
- 顺序语句,时间复杂度为耗时最大的那条语句.
- if-else语句,时间复杂度最大为某一个分支的时间复杂度.
- 分析策略,自底向上分析.
- 分析指标,最坏情况/最好情况/平均时间/空间复杂度,结果稳定性.
- 运行时间中的对数.一般法则:如果一个算法用常数时间(O(1))将问题的大小削减为各个部分,那么该算法的时间复杂度为O(log(n)).
如果使用常数时间只是将问题减少一个常数的数量,那么该算法的时间复杂度为O(n).
## 2.5 结果检验
只能通过收集不同规模输入运行时间来检验.

# 第三章 列表,栈和队列
## 3.1 抽象数据类型ADT
包含数据结构和该数据结构上的操作.
(有的问题要建立数据结构,在该数据结构上有各种操作.有的问题,仅仅在算法内部应用某些数据结构,算出结果返回)
## 3.2 列表list
- 实现列表的数据结构:数组,链表,双向链表.
- 列表的操作:find,remove,add,contains,union等.
- 由于js数组本身就是列表,所以这里就不介绍数组实现了.
- 列表的链表实现参考linked-list.js
- 列表的双向链表实现参考de-linked-list.js
- 优化:可以加一个lazyRemove方法,将要删除的元素的信息保存,等到真正需要的时候再执行删除

## 3.3 栈stack
- 实现栈的数据结构:数组,链表.
- 列表的操作:push,pop,peek,empty等.
- 由于js数组本身就是栈,所以这里就不介绍数组实现了.
- 栈的链表实现参考linked-stack.js
- 栈的应用:方法栈,括号匹配,后缀表达式(逆波兰表达式)求值,中缀表达式转后缀表达式

中缀表达式转后缀表达式代码参考mid-exp-to-suffix-exp.js

## 3.4 队列queue
- 实现栈的数据结构:数组,链表.
- 列表的操作:enqueue,dequeue等.
- 由于js数组本身就是队列,所以这里就不介绍数组实现了.
- 队列的类型:循环队列,有界/无解队列,优先级队列,双端队列

双端队列实现参考deque.js

# 第四章 数tree
## 4.1 预备知识
- 树的相关概念
树,根,节点,边,儿子,父亲,树叶,祖父,孙子,路径,深度,高,祖先,后裔,真祖先,真后裔.
- 树的实现(伪代码)
```
TreeNode{
    Object element
    List<TreeNode> children
}
```
当然还有 第一个儿子/下一个兄弟表示法,可以把上面的List换成数组.本质上没啥区别,但是一般用上面的方式.
- 树的遍历及应用

先序遍历:对节点的处理工作是所有子节点被处理之前进行的.(比如打印一颗文件树的目录结构)

后序遍历:对节点的处理工作是所有子节点被处理之后进行的.(比如计算一颗文件树占用的磁盘空间大小)

对于二叉树,还有中序遍历
## 4.2 二叉树
二叉树是一颗树,它的每个节点的子节点个数不能多于两个.
- 实现
```
TreeNode{
    Object element
    TreeNode left
    TreeNode right
}
```
- 应用
搜索,编译器语法树

tip:对表达式树进行遍历,不同的遍历得到不同的表达式的表示方法.

先序遍历,得到的是前缀表达式.

后序遍历,得到的是后缀表达式.

中序遍历,得到的是中缀表达式.
## 4.3 查找树-二叉查找树
- 条件
所有节点满足:节点值,大于左子节点的值,小于右子节点的值.
- 实现二叉查找树的数据结构:同二叉树
- 二叉树的操作:insert,contains,remove,isEmpty,findMin,findMax,size,lazyRemove等
树的左右子树深度越不平衡,最坏情况树的搜索时间复杂度越大.为了使树尽可能保持平衡,在remove节点的时候,
可以随机选择左子树的最大节点和右子树的最小节点顶替被删除节点的位置.

如果是一串高度有序的值依次insert,那么生成的树会高度不平衡.
可以先将要insert的值进行洗牌操作(洗牌算法参考shuffle.js),再依次insert.

实际应用中,一般会在insert/remove操作时,对树的平衡性进行调整(比如AVL树,红黑树).
## 4.4 AVL树(平衡二叉树)

AVL树对二叉搜索树附加了一个平衡条件-左右子树高度差最多为1.

实现平衡的操作,就是在insert/remove的时候对树进行旋转(rotation).

代码实现参考avl.js(还是有点复杂的).
如果使用场景中删除操作较少,可以不用真删除,将要删除的节点加个删除标记即可,这样可以大大减小复杂度.

## 4.5 伸展树
伸展树的基本想法是,当一个节点被访问后,它就要经过一系列AVL树的旋转被推到根上.如果节点过深,这些旋转,会具有平衡这颗树的作用.

如果一个节点很深,那么在其路径上就存在许多相对较深的节点,通过重新构造可以减少对所有这些节点的进一步访问花费的时间.

实际上,许多应用中,当一个节点被访问时,它很可能不久之后会被再次访问.研究表明,这种情况发生的比人们预想的要频繁的多.
- 简单旋转
将被访问节点旋转为根节点的旋转方式:自底向上沿着访问路径旋转,每次执行该节点和它的父节点之间的旋转.
- 展开
将被访问节点旋转为根节点的旋转方式:自底向上沿着访问路径旋转,将情况分为之字型和一字型,查找/删除该节点的时候进行旋转.

伸展树的性质:当访问路径长而导致超出正常查找时间的时候,这些旋转对未来的操作有益.当访问耗时很少的时候,这些旋转不那么有益甚至有害.

对伸展树的分析很困难,因为它一直在变化.结论是,伸展树不会出现简单旋转策略中常见的那种低效率的坏现象.

## 4.7 B树
之前讨论的,都是所有数据都在内存里面的情况.如果数据多到内存放不下,就需要把数据放在磁盘上.

这样的话,我们之前的假设-所有基本操作的耗时都是一样的,就不成立了.

相对于内存操作,访问磁盘的代价太大了(一次磁盘访问大约值40w条指令).

所以,为了降低时间复杂度,必须尽可能降低树的高度,尽可能保证树的平衡性.

M阶B树具有如下性质:

1. 数据项存储在叶子节点上.(因为数据项可能很大,放在非叶子节点的话,一个磁盘区块能放更少的儿子,会导致树变高)
2. 非叶子节点存储至多M-1个关键字以指示搜索的方向;关键字i代表子树i+1中最小的关键字.
3. 树的根或者是一片树叶,或者其儿子数在2和M之间.
4. 除根外,所有非叶子节点的儿子树在M/2和M之间.
5. 所有叶子在相同的深度上并且有L/2和L之间个数据项.

M和L的确定,insert/remove操作的逻辑,参考"数据结构与算法分析_Java语言描述Mark Allen Weiss第2版中文版.pdf"4.7.

insert/remove的主要思想是 分裂,领养,联合

假设磁盘区块大小为C,每个数据项大小为I,阶数为M,一个指针大小为4.那么L=C/I,M=C/(I*(M-1)+4*M)

为了再次减少访问磁盘的次数,可以将上N层节点常驻内存

数据结构
```
type Value = int
type Key = int
type Point = int
{
    Value value
    Key[M-1] keys
    Point[M] children
}
```

# 第五章 散列表hash
- 散列表上的操作:put,get,remove,contains,clear
- 特点
O(1)时间复杂度执行put/get/remove操作

## 5.1 理想情况
将(key,value)中的key通过hash函数计算得到一个整数值hashcode,然后设置数组的第hashcode项的值为value.

问题:hashcode冲突

## 5.2 散列函数
参考hashcode.js

hash值的生成,非常需要讲究.
https://cloud.tencent.com/developer/news/299571

## 5.3 冲突的解决
有两种方法,分离链接法 和 开放定址法.
- 分离链接法

发生冲突时,将冲突的元素放在双向链表中,hash数组中存放的是这个链表的表头.为什么是双向链表,因为方便删除.

为了区分这些hashcode值一样的元素,要求元素实现equals方法.
## 5.4 开放定址法

如果使用开放定址法,那么数组的size,最好取素数,这样有利于再hash时减小冲突的概率.
jdk8的hashmap实现,取的并不是素数,那是因为它用的不是开放定址法,而是链表+红黑树组合的方法.
当一个链表的节点树达到8个,就将其转为红黑树,当红黑树节点被删除,降低到6个,就转换成链表.
使用双向阈值防止频繁的进行list和tree之间转换.

- hashmap的重要参数
负载因子(load factor),不同的解决冲突的方法,有各自适合的负载因子.

## 5.5 再散列
## 5.6 标准库中的散列
## 5.7 可扩散列

# 第六章 优先级队列

## 6.1 模型
- 优先级队列是允许至少以下两种操作的数据结构:insert和deleteMin.
- 优先级队列可以用于外部排序
- 可以用在贪婪算法

## 6.2 简单实现
链表,avl树

## 6.3 二叉堆(也就是常说的堆)
- 结构性质
堆是一颗完全二叉树,因此堆可以用一个数组实现.

一颗高为h的完全二叉树有2^h到2^(h+1)-1个节点.它的高为log(N).

为了计算方便,一般```arr[0]```空着不用.
```arr[i]```的左儿子为```arr[2i]```,右儿子为```arr[2i+1]```.

- 堆序性质
对于最小堆,根元素比左右子节点都小.任意子树也是一个堆.
所以,任意节点都小于它的所有后裔.

- 基本的堆操作
insert:可能会破坏堆的性质,需要通过不断的进行空穴上移的操作维持(即上滤).
如果一个元素上滤d层,由于交换而执行的次数为3d,可以优化成d+1次赋值.

deleteMin:可能会破坏堆的性质,需要通过不断的进行空穴下移操作维持(即下滤).

由于堆中元素的序信息很少,所以除了最小元素,我们定位其它元素开销会很大.
一般会配合其它数据结构,比如hash,来定位这些元素.
然后我们就可以增加decreaseKey,increaseKey,delete.

建立堆最小的时间复杂度为O(N),这要求自下而上构建堆.
如果是自上而下构建堆,那么时间复杂度为```O(N*log(N))```
构造方法:先把元素都存数组,然后把它视为一颗树(树高h=logN).接下来自下而上,逐层使各个树成为堆.
如果把比较当做基本运算,那么运算次数为```1*2^(h-2)+2*2^(h-3)+3*2^(h-4)+...+(h-1)*2^0```,各项分别为一个等差数列和等比数列对应项的积.
结果是O(N).同理,如果把交换当做基本运算,结果也是O(N).

## 6.4优先级队列的应用
图论,求topN,求第k大的元素,排序.
topN和第k大,在某些情况并不需要构造全部数据的堆,而是可以构造一个较小的堆,丢弃比堆中最大元素还大的值.

## 6.5 d-堆
- 堆的缺点
不支持find,merge困难.

## 6.6 左式堆
- 左式堆和堆的区别是,左式堆不是完全平衡树.
- 左式堆支持堆的merge.

## 6.7 斜堆
- 斜堆是具有堆序的二叉树,但不存在对树的结构限制.
- 斜堆支持堆的merge.

## 6.8 二项队列
- 支持堆的merge

# 第七章 排序
## 7.1 预备知识
本章所讨论的排序算法,都是通用的基于比较的排序.
不是基于比较的排序(比如桶排序),不在本章讨论范围.
任何通用的排序算法至少需要```N*log(N)```次比较.

## 7.2 插入排序
算法思想将无序的元素逐个插入到有序的数组中,并且始终后者的有序性.

最坏情况时间复杂度=2+3+4+5+...+N = O(N^2)
最好情况时间复杂度=O(N),这在输入数据基本有序的情况下发生.
平均时间复杂度=2/2+3/2+4/2+5/2+...+N/2=O(N^2)

## 7.3 一些简单排序算法的下界
定理 N个互异数的数组的平均逆序数是N(N-1)/4

定理 通过交换相邻元素进行排序的任何算法平均时间复杂度为O(N^2).

## 7.4 希尔排序(shellSort)
希尔排序的基本思想,各趟比较所用的距离随着算法的进行而减小,直到只比较相邻元素的最后一趟排序为止.
所以,希尔排序有时也叫做 缩减增量排序.
shell建议选择的增量序列:h(1)=N/2,h(k)=h(k+1)/2.

希尔排序的分析相当复杂.

定理 希尔增量排序最坏情况时间复杂度为O(N^2).

hibbard建议的增量序列:1,3,7,...,2^k-1.

定理 使用hibbard增量的希尔排序最坏情况时间复杂度为O(N^(3/2)).

还有其他人建议的增量序列,这里就不列举了.

## 7.5 堆排序
优先级队列可以O(Nlog(N))时间复杂度排序.

堆排序需要额外的一个数组,存储需求增加一倍.要解决这个问题,可以将deleteMin之后空下来的位置用于存储deleteMin的结果.

## 7.6 归并排序
归并排序最坏情况时间复杂度为O(NlogN),它所使用的比较次数几乎是最优的.

归并排序使用递归,合并两个已排序的表.

该算法只需要对输入数据进行一趟排序.

该算法是经典的分治策略.

归并排序需要额外的一个数组.

交换和比较的性能开销,和具体的语言有关.java中参数只有引用传递,没有值传递,所以交换的开销较小.
而由于对象在堆上面,比较的开销相对较大.所以java标准库中对象数组的排序用的就是归并排序.

归并排序支持外部排序,即数据量大到内存装不下,需要将部分数据放到磁盘的情况.

## 7.7 快速排序
快速排序的过程:
选择一个元素作为中枢纽元(pivot),将数组分成两个部分,第一个部分所有元素小于枢纽元,第二个部分所有元素大于枢纽元.
递归的对数组进行这样的操作,即可实现排序.
快速排序平均时间复杂度是目前所有基于比较的排序算法中最快的.

- 选取枢纽元
选第一个元素作为枢纽元,这在高度有序的情况下,时间复杂度会恶化到N的平方.

选取随机元素作为枢纽元,生成随机数开销大,会严重降低排序性能.

选取中间位置元素作为枢纽元,通常这是最好的做法.

- 分割策略
先将枢纽元放在数组最后,然后使用双指针i和j,分别指向待和枢纽元比较的数组的头和尾.
如果```arr[i]<povit```,就将i右移,直到i>=j或者```arr[i]>=povit```
如果```arr[j]>povit```,就将j左移,直到i>=j或者```arr[j]<=povit```.如果中间过程i和j都停止了,而```i<j```,那么交换arr[i]和arr[j],
继续移动i和j.最后,将povit和```arr[i]```交换位置.
为什么等于枢纽元的时候也停止?如果不这样,那么在元素都是相同的情况下,算法复杂度会退化到O(N^2).

- 小数组
对于很小的数组(N<=20),快速排序不如插入排序.
所以可以在数组很小的时候,切换为插入排序等其他算法(一般N=10时切换).

- topN问题
之前介绍说基于堆的数据结构,寻找第K大的元素.
其实,将快速排序算法稍微调整一下,也可以实现快速的找到第k大的元素.

## 7.8 排序算法的一般下界
任何只用到比较的排序算法在最坏情况下时间复杂度为O(NlogN),这是基于比较的算法时间复杂度的信息-理论下界.
快速排序在相差一个常数因子的范围内平均是最优的.
堆排序比希尔排序要慢,因为堆排序为了移动数据,需要进行两次比较.

## 7.9 桶式排序
假设输入为N个不大于M的正整数,对其进行排序的时间复杂度为O(M+N).
桶排序比基于比较的排序更快,是因为这是一个强模型,它有更多的信息可以利用.

如果存在额外的可用信息,可以充分利用这些信息寻找更高效的算法.

## 7.10 外部排序
外部排序的中心思想是归并.

# 第八章 不相交集(并查集)
## 8.1 等价关系
若对于每一对元素(a,b),a,b都属于S,aRb或者为true或者为false,则称在集合S上定义关系R.
如果aRb为true,则说a与b有关系.

等价关系是满足下列三个性质的关系R:
1.(自反性)对于所有S中的a,aRa
2.(对称性)aRb当且仅当bRa
3.(传递性)若aRb且bRc则aRc

## 8.2 动态等价性问题
该算法是联机算法(google一下,什么是联机算法)

两种方案:一种保证find最坏情况以常数时间执行,另一种保证union以常数时间执行.但是不能二者最坏情况都以常数时间执行.

## 8.3 基本数据结构
首先将各元素按顺序进行编号,编号从0开始,对应数组的下标.
然后使用一个数组代表这些元素.每个元素都是一颗树的节点.
```arr[i]```的值,是它的父亲在arr中的下标.如果是根节点,那么```arr[i]=-1```.

基本操作:
union,给定两个元素,将它们所在的树关联起来.
find,给定一个元素,返回它所在树的名字(名字有根节点给出).

开始时,每个节点都是一颗树.然后每次union,都find它们所在的树的根节点,把两个树合并为一颗树(即把其中一个树的根作为另一个树的父节点).

## 8.4 按大小求并,按秩求并
union的时候,如果随意选择哪颗树的作为新树的根,容易导致树非常不平衡,find的时候时间复杂度最坏为O(N).

可以保存每颗树的大小,每次union,都将小树挂到大树的根节点下面.
每颗树的大小,可以存在根节点的parent字段中(存大小的负值).

另一种优化方法是,按树的秩(高度)进行union.

## 8.5 路径压缩
在find期间,对树进行调整.使被find的元素,包括其所有祖先,都直接指向根节点.

这种自调整的方法,圈起来,要考.

## 8.6 路径压缩和按秩求并的最坏情形
讨论比较复杂,略

## 8.7 应用
生成迷宫:不断的随机选择一面墙,如果该墙分割的单元彼此不联通,那么我们就把这面墙拆掉.重复这个过程,直到开始的单元和终止的单元联通.(实际上不断的拆墙直到每一个单元都可以从每个其他单元达到迷宫效果更好).

求图的联通分量，比如求各城市之间互通还要修几条路，比如网络布线时最少还要布几条线防止多布线浪费材料.

求电气联通性,避免已经联通的元件直接再次连接浪费电线.

# 第九章 图论算法
## 9.1 若干定义
一个图(graph)G=(V,E)由顶点(vertex)的集V和变(edge)的集E组成.

每一条边就是一副点对(v,w),边又是也被称做弧(arc).

如果点对是有序的,那么图就是有向图(digraph).

顶点w和v邻接(adjacent)当且仅当(v,w)属于E.

有时候边还具有权(weight)或值(cost).

路径的长,为该路径上的边数.

如果图含有一条从一个顶点到它自身的路径,那么该路径有时候也叫做环(loop).

有向图中的环(cycle),是指从一个顶点出发,再以这个顶点作为结束,并且长度大于1的一条路径.

无向图中的环,是指从一个顶点出发,再以这个顶点作为结束,并且路径上所有边都互异,并且长度大于1的一条路径.

如果一个有向图没有环,则称其为无环的(acyclic).

一个有向无环图,有时也简称为DAG.

如果一个无向图中每一个顶点到其他顶点都存在一条路径,则称该无向图是连通的(connected).

如果一个有向图中每一个顶点到其他顶点都存在一条路径,则称该有向图是强连通的(strongly connected).

如果一个有向图不是强连通的,但是它的基础图(underlying graph),即其边上去掉方向所形成的图,是连通的,
那么该有向图称为是弱连通的(weakly connected).

完全图(complete graph)是其每一对顶点间都存在一条边的图.

- 图的表示
邻接矩阵(adjacent matrix)表示法.使用一个二维数组.(适用于稠密图)

邻接表(adjacency list)表示.对于每个顶点,都使用一个表存放所有邻接的顶点.
邻接表是表示图的标准方法.

## 9.2 拓扑排序

拓扑排序是对DAG的顶点的一种排序.使得如果存在一条从vi到vj的路径,那么在排序中vj就出现在vi的后面.

一个简单的算法:
先找出任意一个没有入边的顶点.然后显示该顶点,并将它及其边一起从图中删除.
然后我们对图的其余部分同样应用这样的方法处理.
这个算法重复查找没有入边的顶点,可以优化.第一次查找所有没有入边的顶点,放在一个list.
然后删除它,并且更新它的邻边的顶点的入度,更新后立即检查入度,如果为0,则将该顶点加入list.

## 9.3 最短路径算法
赋权路径长(weighted path length).
无权路径长(unweighted path length).

- 单源最短路径问题
- 无权最短路径
广度优先搜索,按层处理顶点。类似与树的层序遍历。

- Dijkstra算法
它是一种贪心算法。用于计算一个节点到其他节点的最短路径，要求边的权不能为负数。
它的主要特点是以起始点为中心向外层层扩展(广度优先搜索思想)，直到扩展到终点为止。
算法步骤：https://blog.csdn.net/heroacool/article/details/51014824

基本思想
1 通过Dijkstra计算图G中的最短路径时，需要指定起点s(即从顶点s开始计算)。

2 此外，引进两个集合S和U。S的作用是记录已求出最短路径的顶点(以及相应的最短路径长度)，而U则是记录还未求出最短路径的顶点(以及该顶点到起点s的距离)。

3 初始时，S为空。U中顶点的路径是”起点s到该顶点的路径”。然后，从U中找出路径最短的顶点，并将其加入到S中；接着，更新U中的顶点和顶点对应的路径。 然后，再从U中找出路径最短的顶点，并将其加入到S中；接着，更新U中的顶点和顶点对应的路径。 … 重复该操作，直到遍历完所有顶点。

操作步骤
1 初始时，S为空；U中顶点的距离为”起点s到该顶点的距离”[例如，U中顶点v的距离为(s,v)的长度，然后s和v不相邻，则v的距离为∞]。

2 从U中选出”距离最短的顶点k”，并将顶点k加入到S中；同时，从U中移除顶点k。

3 更新U中各个顶点到起点s的距离。之所以更新U中顶点的距离，是由于上一步中确定了k是求出最短路径的顶点，从而可以利用k来更新其它顶点的距离；例如，(s,v)的距离可能大于(s,k)+(k,v)的距离。

4 重复步骤(2)和(3)，直到遍历完所有顶点。

代码参考 dijkstra.js

- 无环图
如果图是无环的，那么可以按拓扑排序的顺序遍历顶点，更新出边的距离值（不再需要二叉堆了），这只需要遍历一趟即可完成。

无环图的一个重要应用是 关键路径分析法。

动作节点图：边代表动作优先关系，顶点代表动作。常常用来模拟方案的构建。

采用最短路径算法，计算所有节点最早完成时间。

松弛时间代表对应动作可以被延迟而又不至于推迟整体的完成时间量。

至少存在一条完全有零-松弛边组成的路径，这样的路径是关键路径。

## 9.4 网络流问题
哎呦，怎么在一个小节讨论一个这么大的问题哦。
- 问题描述
给定指定的一个有向图,其中有两个特殊的点源S(Sources)和汇T(Sinks),每条边有指定的容量(Capacity),求满足条件的从S到T的最大流(MaxFlow).

- 相关概念
流图，表示算法的任意阶段已经达到的流。
残余图，表示对于每条边还能再添加多少流。
残余边，残余图的边叫做残余边。
增长通路，在每个阶段，我们寻找残余图中s到t的一条路径，这条路径叫做增长通路。

- 一个简单的最大流算法
概括来说就是，从残余图中寻找一条增长通路，然后调整流图和计算残余图。这是采用贪心算法，但是这里采用贪心算法得到的不是最优解（最大流）,所以需要调整。
例如，有向图G(用邻接数组描述，这里不方便画图，请自行画图以方便理解)，有顶点```[s,a,b,c,d,t]```
```
[
	[null,3,2,0,0,0],
	[0,null,1,3,4,0],
	[0,0,null,0,2,0],
	[0,0,0,null,0,2],
	[0,0,0,0,null,3],
	[0,0,0,0,0,null]
]
```
最优解为s->a->c->t(2)加上s->b->d->t(2)加上s->a->d->t(1),最大流量为5.
而如果使用贪心算法，可能得到s->a->d->t(3)之后，残余图中没有增长路径，得出的解为3.
这里贪心导致s->a->c->t和s->b->d->t这两条路径中有一部分被s->a->d->t占用了，然后有一部分路径被浪费了，s->a->d->t有2个单位的流量是错的。
为了能够得到最优解，我们需要把浪费的路径利用起来，并且去掉错误的路径。
可以通过在路径中包含一条错误路径的反向路径来实现。
这里错误的路径是a->d(2),但是d->a(2)这条路径不存在，所以我们需要在得到s->a->d->t(3)之后，
立即添加一条路径d->a(2).但是为什么是d->a,而且容量是2呢？
我们并不知道，s->a->d->t这条路径中，任何一条路径都可能是错的，而且错误的流量大小，最大可能为s->a->d->t的流量大小。
所以，实际上在得到s->a->d->t(3)之后，我们需要添加一条反向的路径。
添加完反向路径后，之前浪费的路径，可以通过这条加的路径，被充分利用起来。

所以这种算法的基本思想就是，可撤销的贪心。最大网络流算法，是一种特殊的线性规划算法。

代码参考max-net-flow.js

这个算法有很多地方需要优化，比如有的情况有多条增长通路，但是随机选择的增长通路，可能是最小的，这会导致算法执行很多遍，而实际上可能只需要两三遍。
优化方法，选择最大的增长通路，或者选择最短的增长通路，或者其他更复杂的方法。

## 9.5 最小生成树
在一个无向图中找出一颗最小生成树（由该图的连接所有顶点的边构成的树，其总价值最低）。
对于有向图也有意义，不过解决起来更困难。

比如，用最少的电线给房子安装电路。

- prim算法
是一种贪心算法。
prim算法和单源最短路径算法dijkstra大体相同。
prim算法每次从剩余顶点中选则一个离已选顶点距离最近的顶点，将这条边加入到最小生成树中。
代码参考prim.js

- kruskal算法
是一种贪心算法，使用并查集算法和堆数据结构。
操作步骤：
1，将所有顶点当成一个森林；将所有的边构建一个最小堆；
2，在堆上执行deleteMin，然后用并查集检查边的两个顶点是否连通。
如果连通，就什么都不用做。如果不连通，就执行并查集的union操作，使之连通；
3，重复执行步骤2，直到堆为空。
ps：如果并查集的union或者find操作有路径压缩，那么需要用一颗新的树保存最小生成树。

kruskal可以使用贪心算法，基于一个恒定的事实，如果两个顶点已经连通，那么再将他们连接起来，将会形成一个环，
为了得到最小生成树，必须删除环中最大的边，选择两条较小的边。

对prim算法和kruskal算法正确性证明，可以参考https://blog.csdn.net/towads/article/details/71159202
这篇文章介绍的切分定理，可以证明prim和kruskal算法的正确性，并且是目前我见过最简单最好理解的证明。

## 9.6 深度优先搜索
深度优先搜索(depth-first search,简称DFS)是对先序遍历(preorder traversal)的推广。

一般为了避免有环图造成的死循环，会给顶点加一个visited字段标记顶点是否已经被访问。

为了避免顶点之间的不可达（图不连通，或者有向图边的方向导致不可达，或者顶点间的连接方式不支持线性遍历），DFS后我们会搜索一个未被访问的顶点，直到所有顶点被标记为已访问。

对图进行DFS的时候，我们可以生成一颗（一组）树，并记录访问的顺序，这时候我们就得到了一个 深度优先生成森林。

- 双连通性
一个连通的无向图如果不存在被删除之后使得剩下的图不再连通的顶点，那么这样的无向连通图就称为是双连通的。

如果一个图不是双连通的，那么将其删除使图不再连通的那些顶点叫做割点（articulation point）。

DFS提供一种找出连通图中的所有割点的线性时间算法。

- 欧拉回路
简单的说就是一笔画游戏。

## 9.7 NP完全性介绍
- P问题
在多项式时间内可解的问题为P问题（Polynomial Problem，多项式问题）。

- NP问题
NP问题（(Non-deterministic Polynomial Problem，非确定性多项式问题），NP问题就是指其解的正确性可以在多项式时间内被检查的一类问题。

- NPC问题
NPC问题是指满足下面两个条件的问题：
（1）它是一个NP问题；
（2）所有的NP问题都可以用多项式时间归约到它。
NPC问题也叫做NP=P?问题。
证明一个问题是NPC问题，先证明它是NP问题，再证明其中一个已知的NPC问题能归约到它。
只要任意一个NPC问题找到了一个多项式的算法，那么所有NP问题都能用这个算法解决了，NP也就等于P了。
目前而言，只要证明一个问题是NPC问题，那么我们只能用指数级甚至是阶乘级复杂度求解了。

- NPH问题
NP-Hard问题是这样一种问题，它满足NPC问题定义的第二条但不一定要满足第一条（就是说，NP-Hard问题要比 NPC问题的范围广）。
NPH问题，没有约束问题能够在多项式时间可以解决。

# 第十章 算法设计思想
本章将注意力从算法的实现转向算法的设计。
本章将讨论用于求解问题的几种通常类型的算法。
## 10.1 贪心算法
贪心算法分阶段工作，每个阶段可以认为所做的决定是最好的，而不考虑将来的后果。
通常，这意味着选择的是某个局部最优的。

- 贪心算法的例子
调度问题(所有调度问题要么是NPC，要么是贪心可解的)。
哈夫曼编码问题。
近似装箱问题。

## 10.2 分治算法
分治算法由两部分组成：
分(divide):将大的问题分解为较小的问题，解决各较小的问题。
治(conquer):然后从子问题的解构建原问题的解。

分治算法的例子
归并排序，快速排序，二分法查找，最近点问题，选择问题（求第k个最小元素），大整数想乘。

## 10.3 动态规划
任何数学递推公式都可以直接转换乘递归算法。

- 基本思想
动态规划算法通常用于求解具有某种最优性质的问题。在这类问题中，可能会有许多可行解。每一个解都对应于一个值，我们希望找到具有最优值的解。动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。与分治法不同的是，适合于用动态规划求解的问题，经分解得到子问题往往不是互相独立的。若用分治法来解这类问题，则分解得到的子问题数目太多，有些子问题被重复计算了很多次。如果我们能够保存已解决的子问题的答案，而在需要时再找出已求得的答案，这样就可以避免大量的重复计算，节省时间。我们可以用一个表来记录所有已解的子问题的答案。不管该子问题以后是否被用到，只要它被计算过，就将其结果填入表中。这就是动态规划法的基本思路。具体的动态规划算法多种多样，但它们具有相同的填表格式。（参考百度百科：动态规划算法）

- 基本概念
1. 多阶段决策问题
2. 动态规划问题中的术语
阶段，状态，决策，策略，状态转移方程。（具体内容参考百度百科：动态规划算法）

- 基本结构

- 基本模型
1. 确定问题的决策对象。
2. 对决策过程划分阶段。
3. 对各阶段确定状态变量。
4. 根据状态变量确定费用函数和目标函数。
5. 建立各阶段状态变量的转移过程，确定状态转移方程。

- 适用条件
1. 最优化原理（最优子结构性质）。
2. 无后效性。
3. 子问题重叠性。

动态规划一般可分为线性动规，区域动规，树形动规，背包动规四类。

动态规划算法的例子
最优二叉查找树，所有点对最短路径。

## 10.4 随机化算法
在算法期间，随机数至少有一次用于决策。

随机化算法的应用
跳跃表中按概率决定节点的阶。
测试大数是否是素数。

- 随机数发生器
线性同余数发生器 ```x(i+1)=A*x(i) mod M```
x(0)的值，叫做种子(seed)。
生成的随机数序列是有周期的，其周期为M-1。
研究表明，M=2^31-1,A=48271效果比较好。

## 10.5 回溯算法
回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。许多复杂的，规模较大的问题都可以使用回溯法，有“通用解题方法”的美称。(内容来自百度百科：回溯算法)

简单的说就是优化的并且带有剪裁操作的穷举法。在尝试可能的步骤中，加入剪裁操作,而不是等结果构建出来再去检查。
在一步内删除一大组可能性的做法叫做剪裁(pruning)。
要实现回溯的效果，一般都是用递归，调用栈帮我们保存了上下文，尝试可能性失败后，我们回到原来的上下文，继续尝试下一种可能。
如果待尝试的条件是多维的，那么需要多个尝试的函数。

- 回溯算法的例子
收费公路重建问题。八皇后问题(代码参考eight-queen.js)。

## 10.6 其他算法思想
经典的八大算法思想：穷举、贪心、回溯、分治、递归、递推、动态规划、迭代。
# 第十一章 摊还分析
考虑任意顺序的M次操作的最坏情形运行时间。

如果能够对一系列操作保持相同的界的同时又简化数据结构，那么我们愿意牺牲单次操作的界。
## 11.1 位势(potential)
有时候间接求解一个问题要比直接求解容易。摊还分析将采用这个思路。
我们引入一个附加变量，叫做位势。
## 11.2 二项队列
## 11.3 斜堆
## 11.4 斐波那契堆
## 11.5 伸展树
# 第十二章 高级数据结构及实现
## 12.1 自顶向下伸展树
## 12.2 红黑树
## 12.3 确定性跳跃表
## 12.4 AA-树
## 12.5 treap树
## 12.6 k-d树
## 12.7 配对堆
附录：
一些数据结构的实际应用场景 https://blog.csdn.net/hellozhxy/article/details/92845357

















