/**
二叉搜索树
http://lib.csdn.net/article/datastructure/9204
http://www.cnblogs.com/huangxincheng/archive/2012/07/22/2603956.html
*/
function bst(){
    let tree = {
        root:null,
        add(value){
            if(this.root == null){
                this.root = {
                    value,left:null,right:null
                };
                return true;
            }
            let node = this.root;
            while(node.value!=null){
                if(value < node.value){
                    if(node.left == null){
                        node.left = {};
                    }
                    node = node.left;
                }else if(value > node.value){
                    if(node.right == null){
                        node.right = {};
                    }
                    node = node.right;
                }else{
                    return false;
                }
            }
            node.value = value;
            return true;
        },
        del(value){
            let father = this.root;
            let node = this.root;
            while(node != null){
                if(value < node.value){
                    father = node;
                    node = node.left;
                }else if(value > node.value){
                    father = node;
                    node = node.right;
                }else{
                    break;
                }
            }
            if(node == null){//未找到
                return false;
            }
            //console.info(father.value);
            //找后继节点,比当前节点大的最小节点,用后继节点替换待删除节点的位置。
            let parent = node;
            let after = node;
            if(node.right != null){//后继存在
                after = node.right;
                while(after.left != null){
                    parent = after;
                    after = after.left;
                }
            }
            if(node == father){//根节点为待删除节点
                if(after == node){//没有找到后继,说明待删除节点没有右孩子,那就用待删除节点的左孩子替换待删除节点。
                    this.root = node.left;
                }else{
                    parent.left = null;
                    after.left = node.left;
                    after.right = node.right;
                    this.root = after;
                }
            }else{
                if(after == node){//没有找到后继,说明待删除节点没有右孩子,那就用待删除节点的左孩子替换待删除节点。
                    if(father.left == node){//待删除节点为左节点
                        father.left = node.left;
                    }else{
                        father.right = node.right;
                    }
                }else{
                    parent.left = null;
                    after.left = node.left;
                    after.right = node.right;
                    if(father.left == node){//待删除节点为左节点
                        father.left = after;
                    }else{
                        father.right = after;
                    }
                }
            }
            //node.left = node.right = null;
            return true;
        },
        find(value){
            let node = this.root;
            while(node != null){
                if(value < node.value){
                    node = node.left;
                }else if(value > node.value){
                    node = node.right;
                }else{
                    return node;
                }
            }
            return null;
        }
    };
    return tree;
}
(()=>{
    let t = bst();
    t.add(-1);

    t.add(-3);t.add(-2);
    t.add(-4);
    t.add(-5);
    t.add(-6);
    //console.info(JSON.stringify(t,null,2));
    //console.info(t.find(0));
    //console.info(t.find(-3));
    console.info(JSON.stringify(t,null,2));
    t.del(-1);
    console.info(JSON.stringify(t,null,2));
})();