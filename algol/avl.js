/**
avl树(平衡二叉树)
http://lib.csdn.net/article/datastructure/9204
http://www.cnblogs.com/huangxincheng/archive/2012/07/22/2603956.html
https://www.cnblogs.com/skywang12345/p/3576969.html
 父节点的左子树和右子树的高度之差不能大于1，也就是说不能高过1层，否则该树就失衡了，此时就要旋转节点
之前用平衡因子的属性实现过一个版本，不过比较麻烦。
因为不能直接根据左右节点得出父节点的平衡因子。毕竟平衡的定义是left.height-right.height。
所以用height字段实现方便许多。
为了区分添加/删除节点是否成功，给树添加了一个size的属性。
这个实现，基本上是上面那篇代码的js版。
*/
function _insert(node,value,tree){
    if(node == null){
        tree.size++
        return {
            value,height:1
        }
    }
    if(value == node.value){
        return node
    }
    if(value < node.value){
        node.left = _insert(node.left,value,tree)
        if(height(node.left) - height(node.right) == 2){
            if(value < node.left.value){
                node = rotateLL(node)
            }else{
                node = rotateLR(node)
            }
        }
    }else{
        node.right = _insert(node.right,value,tree)
        if(height(node.left) - height(node.right) == -2){
            if(value > node.right.value){
                node = rotateRR(node)
            }else{
                node = rotateRL(node)
            }
        }
    }
    node.height = Math.max(height(node.left),height(node.right)) + 1
    return node;
}
function _remove(node,value,tree){
    if(node == null){
        return null
    }
    if(value < node.value){
        node.left = _remove(node.left,value,tree)
        if(height(node.left) - height(node.right) == -2){
            let right = node.right
            if(value < right.value){
                node = rotateRR(node)
            }else{
                node = rotateRL(node)
            }
        }
    }else if(value > node.value){
        node.right = _remove(node.right,value,tree)
        if(height(node.left) - height(node.right) == 2){
            let left = node.left
            if(value < left.value){
                node = rotateRR(node)
            }else{
                node = rotateRL(node)
            }
        }
    }else{
        if(node.left == null){
            node = node.right
            tree.size--
        }else if(node.right == null){
            node = node.left
            tree.size--
        }else{
            if(height(node.left) > height(node.right)){
                let prev = findPrev(node.left)
                node.value = prev.value
                node.left = _remove(node.left,prev.value,tree)
            }else{
                let next = findNext(node.right)
                node.value = next.value
                node.right = _remove(node.right,next.value,tree)
            }
        }
    }
    return node
}
function findPrev(node){
    let p = node
    while(p.right != null){
        p = p.right
    }
    return p
}
function findNext(node){
    console.info(`findNext`)
    let p = node
    while(p.left != null){
        p = p.left
    }
    return p
}
function createAvl(){
    let tree = {}
    tree.root = null
    tree.size = 0//记录节点数
    tree.insert = function(value){
        let oldSize = this.size
        this.root = _insert(this.root,value,this)
        return oldSize < this.size
    };
    tree.remove = function(value){
        let oldSize = this.size
        this.root = _remove(this.root,value,this)
        return oldSize > this.size
    };
    tree.find = function(value){
        let node = this.root
        while(node != null && value != node.value){
            if(value < node.value){
                node = node.left
            }else{
                node = node.right
            }
        }
        return node
    };
    return tree
}
function height(node){
    return node == null?0:node.height
}
function rotateRR(node){
    let _root = node.right
    node.right = _root.left
    _root.left = node
    node.height = Math.max(height(node.left),height(node.right)) + 1
    _root.height = Math.max(node.height,height(_root.right)) + 1
    return _root
}
function rotateRL(node){
    node.right = rotateLL(node.right)
    return rotateRR(node)
}
function rotateLL(node){
    let _root = node.left
    node.left = _root.right
    _root.right = node
    node.height = Math.max(height(node.left),height(node.right)) + 1
    _root.height = Math.max(height(_root.left),node.height) + 1
    return _root
}
function rotateLR(node){
    node.left = rotateRR(node.left)
    return rotateLL(node)
}
(()=>{
    console.table(`============`)
    let t = createAvl()
    t.insert(1)
    console.table(JSON.stringify(t,null,2))
    t.insert(2)
    console.table(JSON.stringify(t,null,2))
    t.insert(3)
    console.table(JSON.stringify(t,null,2))
    t.insert(4)
    console.table(JSON.stringify(t,null,2))
    t.insert(5)
    console.table(JSON.stringify(t,null,2))
    t.insert(6)
    //console.table(t.insert(6))
    console.table(JSON.stringify(t,null,2))
    //console.table(t.insert(4))
    console.table(t.remove(4))
    console.table(JSON.stringify(t,null,2))
})()