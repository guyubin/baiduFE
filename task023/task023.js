var log = function() {
    console.log.apply(console, arguments)
}

var NodeTraversalList = []

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
        if (!(NodeTraversalList.includes(node))) {
            NodeTraversalList.push(node)
        }
        var list = node.childNodes
        for (var i = 0; i < list.length; i++) {
            preOrder(list[i])
        }
    }
}

var preOrderList = function() {
    var node = document.querySelector('.level1')
    preOrder(node)
}

var bindEventToButtonPrev = function() {
    var buttonPrev = document.querySelector('.button-prev')
    buttonPrev.addEventListener('click', function() {
        // 首先将 NodeTraversalList 置为空
        NodeTraversalList.length = 0
        // 进行前序遍历， 并将遍历得到的节点按照遍历顺序插入 NodeTraversalList 中
        preOrderList()
        // log(NodeTraversalList)
        // 进行动画描绘
        setAnimation()
    })
}

// for (var i = 0; i < node.childNodes.length; i++) {
// if (node.childNodes[i].nodeType === 3) {
// console.log(node.childNodes[i])
// console.log(node.childNodes[i].length)
// console.log(node.childNodes[i].nodeValue.trim().length)
// }
// }

var valueMatch = function(value, node) {
    var len = node.childNodes.length
    for (var i = 0; i < len; i++) {
        if (node.childNodes[i].nodeType === 3) {
            var str = node.childNodes[i].nodeValue.trim()
            if (value === str) {
                return true
            }
        }
    }

    return false
}

var setAnimationQuery = function(queryValue) {
    var len = NodeTraversalList.length
    var value = queryValue
    var flag = false
    var NowIndex = 0

    var animationID = setInterval(function() {
        if (NowIndex < len && flag === false) {
            log('NowIndex', NowIndex, 'flag', flag,'len',len)
            NodeTraversalList[NowIndex].style.backgroundColor = 'blue'
            if (NowIndex - 1 >= 0) {
                NodeTraversalList[NowIndex - 1].style.backgroundColor = 'white'
            }
            if (valueMatch(value, NodeTraversalList[NowIndex])) {
                flag = true
            } else {
                NowIndex++
            }
        } else {
            if (flag === true) {
                clearInterval(animationID)
                NodeTraversalList[len - 1].style.backgroundColor = 'white'
                NodeTraversalList[NowIndex].style.backgroundColor = 'red'
                setTimeout(function(){
                    NodeTraversalList[NowIndex].style.backgroundColor = 'white'
                }, 5000)
            } else {
                log(1)
                clearInterval(animationID)
                NodeTraversalList[len - 1].style.backgroundColor = 'white'
                alert('no match')
            }
        }
    }, 500)

}

var bindEventToButtonQuery = function() {
    var buttonQuery = document.querySelector('.button-query')
    buttonQuery.addEventListener('click', function() {
        // 动画查找过程
        var input = document.querySelector('#id-input-query')
        var inputValue = input.value
        preOrderList()
        setAnimationQuery(inputValue)
    })
}


var __main = function() {
    // 绑定事件到前序遍历的按钮
    bindEventToButtonPrev()
    //
    bindEventToButtonQuery()
}

__main()
