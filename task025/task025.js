var log = function() {
    console.log.apply(console, arguments)
}

// 所有的不是最低级的 div 元素集合
var UpperDivNodes = []
//
var AllDivs = []
//
var queryResult = []
//
var queryResultUpper = []

var hasDivNodes = function(node) {
    var flag = false
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === 1 && node.childNodes[i].tagName === 'DIV') {
            flag = true
            break
        }
    }
    return flag
}

var findHasDivNodes = function(div) {
    if (hasDivNodes(div)) {
        UpperDivNodes.push(div)
    }
    for (var i = 0; i < div.childNodes.length; i++) {
        findHasDivNodes(div.childNodes[i])
    }
}

var findAllDivs = function(div) {
    if (div.nodeType === 1 && div.tagName === 'DIV') {
        AllDivs.push(div)
    }
    for (var i = 0; i < div.childNodes.length; i++) {
        findAllDivs(div.childNodes[i])
    }
}

var makeUnseen = function() {
    for (var i = 1; i < AllDivs.length; i++) {
        AllDivs[i].classList.add('invisible')
    }
}

var addFolderMark = function() {
    var t = `
    <i class="fa fa-folder" aria-hidden="true"></i>
    `
    for (var i = 0; i < UpperDivNodes.length; i++) {
        var span = UpperDivNodes[i].querySelector('span')
        span.insertAdjacentHTML('afterbegin', t)
    }
}

var init = function() {
    // 找出所有拥有 div 元素作为子节点的 div
    var div = document.querySelector('.level1')
    findHasDivNodes(div)    // UpperDivNodes
    // 给出所有的 div 元素
    findAllDivs(div)        // AllDivs
    // 使除 level1 外的所有 div 元素不可见
    makeUnseen()
    // 给所有 UpperDivNodes 加上闭合的文件夹图标
    addFolderMark()
}

var fold = function() {
    var div = document.querySelector('.level1')
    div.addEventListener('click', function(event) {
        var target = event.target

        if (target.tagName === 'SPAN') {
            var span = target
            var icon = span.querySelector('i')
            if (icon === null || icon === undefined) {
                return
            }
            if (icon.classList.contains('fa-folder')) {
                log(1)
                var d = target.closest('div')
                if (UpperDivNodes.includes(d)) {
                    // 找到该元素的直接子元素 子元素为 div，改为显示
                    var children = d.childNodes
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].tagName === 'DIV' && children[i].classList.contains('invisible')) {
                            children[i].classList.remove('invisible')
                        }
                    }
                }
                // 改变文件夹的显示形态
                icon.classList.remove('fa-folder')
                icon.classList.add('fa-folder-open')
            } else if (icon.classList.contains('fa-folder-open')) {
                log(2)
                var d = target.closest('div')
                if (UpperDivNodes.includes(d)) {
                    // 找到该元素的直接子元素 子元素为 div，改为显示
                    var children = d.childNodes
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].tagName === 'DIV') {
                            children[i].classList.add('invisible')
                        }
                    }
                }
                // 改变文件夹的显示形态
                icon.classList.remove('fa-folder-open')
                icon.classList.add('fa-folder')
            }
        }
    })
}

var iconVisible = function() {
    var div = document.querySelector('.level1')
    var spans = div.querySelectorAll('span')
    var t = `
    <i class="fa fa-plus" aria-hidden="true"></i>
    <i class="fa fa-times" aria-hidden="true"></i>
    `

    for (var i = 0; i < spans.length; i++) {
        spans[i].insertAdjacentHTML('beforeend', t)
    }
}

var addContent = function() {
    var div = document.querySelector('.level1')
    div.addEventListener('click', function(event) {
        var target = event.target
        if (target.classList.contains('fa-plus')) {
            var str = prompt('add content:')
            var divSelect = target.closest('div')
            if (divSelect !== null && divSelect !== undefined) {
                // 获取 selectedDiv 的 level
                var classList = divSelect.classList
                for (var i = 0; i < classList.length; i++) {
                    if (classList[i].includes('level')) {
                        break
                    }
                }
                var level = Number(classList[i][classList[i].length - 1])

                var t = `
                <div class="level${level + 1} invisible">
                    <span>${str}
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                </div>
                `
                divSelect.insertAdjacentHTML('beforeend', t)
                // 打开文件夹
                var children = divSelect.childNodes
                for (var i = 0; i < children.length; i++) {
                    if (children[i].tagName === 'DIV' && children[i].classList.contains('invisible')) {
                        children[i].classList.remove('invisible')
                    }
                }
                // 添加完了项目后，观察现在的 divSelect 有没有文件夹图案， 如果没有，加上\
                var span = divSelect.querySelector('span')
                var icons = span.querySelectorAll('i')
                var flag = false
                for (var i = 0; i < icons.length; i++) {
                    if (icons[i].classList.contains('fa-folder') || icons[i].classList.contains('fa-folder-open')) {
                        flag = true
                        break
                    }
                }

                if (flag === false) {
                    var t = `
                    <i class="fa fa-folder" aria-hidden="true"></i>
                    `
                    span.insertAdjacentHTML('afterbegin', t)
                }
                // 改变文件夹的显示形态
                var icon = span.querySelector('.fa-folder')
                icon.classList.remove('fa-folder')
                icon.classList.add('fa-folder-open')
            }
        }
        if (target.classList.contains('fa-times')) {
            var deleteDiv = target.closest('div')
            deleteDiv.remove()
        }
    })
}

var addAndDeleteNode = function() {
    // 首先是移动到相应选项上时出现添加和删除标志
    iconVisible()
    // 添加
    addContent()
}

var getStr = function(node) {
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === 3) {
            if (node.childNodes[i].nodeValue.trim() !== '') {
                return node.childNodes[i].nodeValue
            }
        }
    }

    return ''
}

var getUpper = function(node) {
    if (node !== AllDivs[0]) {
        queryResultUpper.push(node)
        getUpper(node.parentElement)
    } else {
        queryResultUpper.push(node)
        return
    }
}

var queryNode = function() {
    var queryButton = document.querySelector('.button-query')
    queryButton.addEventListener('click', function() {
        // 清空查询数组
        queryResult.length = 0
        // 取得查询值
        var input = document.querySelector('#id-input-query')
        var inputValue = input.value
        input.value = ''


        // var span = AllDivs[0].querySelector('span')
        // log('span', span)
        // var str = getStr(span)
        // log(str)

        // 在所有div 中进行查询
        for (var i = 0; i < AllDivs.length; i++) {
            var span = AllDivs[i].querySelector('span')
            var str = getStr(span)
            if (inputValue === str) {
                queryResult.push(AllDivs[i])
                span.style.color = 'red'
            }
        }
        if (queryResult.length === 0) {
            alert('no result')
        }
        //
        queryResultUpper.length = 0
        for (var i = 0; i < queryResult.length; i++) {
            getUpper(queryResult[i])
        }
        //

        // open
        for (var i = 0; i < queryResultUpper.length; i++) {
            var nodeTemp = queryResultUpper[i]
            log(nodeTemp)
            if (nodeTemp.classList.contains('invisible')) {
                nodeTemp.classList.remove('invisible')
            } else {}
            var children = nodeTemp.childNodes
            log(children)
            for (var n = 0; n < children.length; n++) {
                if (children[n].tagName === 'DIV' && children[n].classList.contains('invisible')) {
                    children[n].classList.remove('invisible')
                }
            }

            var span = nodeTemp.querySelector('span')
            var icon = span.querySelector('i')
            if (icon.classList.contains('fa-folder')) {
                icon.classList.remove('fa-folder')
                icon.classList.add('fa-folder-open')
            } else if (icon.classList.contains('fa-folder-open')) {

            }


                //
                // var d = target.closest('div')
                // if (UpperDivNodes.includes(d)) {
                //     // 找到该元素的直接子元素 子元素为 div，改为显示
                //     var children = d.childNodes
                //     for (var i = 0; i < children.length; i++) {
                //         if (children[i].tagName === 'DIV' && children[i].classList.contains('invisible')) {
                //             children[i].classList.remove('invisible')
                //         }
                //     }
                // }
                // // 改变文件夹的显示形态
                // icon.classList.remove('fa-folder')
                // icon.classList.add('fa-folder-open')
        }
    })
}

var __main = function() {
    init()
    // add the fold function
    fold()
    // 增加和删除节点
    addAndDeleteNode()
    // 查找
    queryNode()
}

__main()
