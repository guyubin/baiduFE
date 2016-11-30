var log = function() {
    console.log.apply(console, arguments)
}

var NodeTraversalList = []

var NowIndex = 0

// timeH = setInterval(function(){
//         //getData.next()每调用一次, 其值都会改变, 故设一个临时变量存储其值
//         var temp = getData.next().value;
//         if(temp!=undefined && temp!="ending"){
//             showData(temp);
//         }else if(temp=="ending"){
//             clearInterval("timeH");
//         }
//     },50);

var setAnimation = function() {
    var len = NodeTraversalList.length
    NowIndex = 0
    var animationID = setInterval(function() {
        if (NowIndex < len) {
            NodeTraversalList[NowIndex].style.backgroundColor = 'blue'
            if (NowIndex - 1 >= 0) {
                NodeTraversalList[NowIndex - 1].style.backgroundColor = 'white'
            }
            NowIndex++
        } else {
            clearInterval(animationID)
            NodeTraversalList[len - 1].style.backgroundColor = 'white'
        }
    }, 500)

}

var preOrder = function(node) {
    if (node !== null && node.nodeType === 1) {
        NodeTraversalList.push(node)
        var list = node.childNodes
        for (var i = 0; i < list.length; i++) {
            preOrder(list[i])
        }
    }
}

var preOrderList = function() {
    var node = document.querySelector('.div-level1')
    preOrder(node)
}

var bindEventToButtonPrev = function() {
    var buttonPrev = document.querySelector('.button-prev')
    buttonPrev.addEventListener('click', function() {
        // 首先将 NodeTraversalList 置为空
        NodeTraversalList.length = 0
        // 进行前序遍历， 并将遍历得到的节点按照遍历顺序插入 NodeTraversalList 中
        preOrderList()
        // 进行动画描绘
        setAnimation()
    })
}

var inOrder = function(node) {
    if (node !== null && node !== undefined && node.nodeType === 1) {
        //
        var list = []
        for (var i = 0; i <node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType === 1) {
                list.push(node.childNodes[i])
            }
        }
        if (list[0] !== null) {
            inOrder(list[0])
        }
        NodeTraversalList.push(node)
        if (list[1] !== null) {
            inOrder(list[1])
        }
    }
}

var inOrderList = function() {
    var node = document.querySelector('.div-level1')
    inOrder(node)
}

var bindEventToButtonMiddle = function() {
    var buttonMiddle = document.querySelector('.button-middle')
    buttonMiddle.addEventListener('click', function() {
        NodeTraversalList.length = 0
        inOrderList()
        setAnimation()
    })
}

var postOrder = function(node) {
    if (node !== null && node.nodeType === 1) {
        var list = node.childNodes
        for (var i = 0; i < list.length; i++) {
            postOrder(list[i])
        }
        NodeTraversalList.push(node)
    }
}

var postOrderList = function() {
    var node = document.querySelector('.div-level1')
    postOrder(node)
}

var bindEventToButtonPost = function() {
    var buttonPost = document.querySelector('.button-post')
    buttonPost.addEventListener('click', function() {
        NodeTraversalList.length = 0
        postOrderList()
        setAnimation()
    })
}

var __main = function() {
    // 绑定事件到前序遍历的按钮
    bindEventToButtonPrev()
    // 绑定事件到中序遍历的按钮
    bindEventToButtonMiddle()
    //
    bindEventToButtonPost()
}

__main()
