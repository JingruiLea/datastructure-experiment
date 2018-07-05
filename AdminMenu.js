var utils = require('./utils')
var log = console.log
var graph = require('./Graph')

function start(){
    utils.printOutFile('AdminMenu_0')
    utils.getChoice(choice =>{
        switch(choice){
            case '1':
                inputNewVert()
            break
            case '2':
                inputNewEdge()
            break
            case '3':

            break
            case '4':

            break
            case '0':

            break
            default:
        }
    })
}

function inputNewVert(){
    utils.simpleInter(
        ['请输入景点名称.'],
        '确定添加 ${0} 景点吗',
        graph.addAloneVert,
        start,
        graph
    )
}

function inputNewEdge(){
    utils.simpleInter(
        ['请输入路径起点.','请输入路径终点.','请输入路径长度.'],
        '确定添加从 ${0} 到 ${1} 的 ${2} 米路径吗',
        graph.addEdgeOrNewVert,
        start,
        graph
    )
}




module.exports = AdminMenu = {inputNewEdge}