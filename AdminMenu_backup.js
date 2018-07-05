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
                deleteVert()
            break
            case '4':
                deletePath()
            break
            case '0':

            break
            default:
        }
    })
}

function deleteVert(){
    utils.simpleInter(
        ['请输入景点名称.'],
        '确定删除 ${0} 景点吗',
        graph.deleteVert,
        start,
        graph
    )
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

async function inputNewEdge(){
    let isValid = () => {
        if (!graph.findVert(answer1)) {
            log(`景点 ${answer1} 不存在, 请检查输入!`)
            return false
        }
        if (!graph.findVert(answer2)){
            log(`景点 ${answer2} 不存在, 请检查输入!`)
            return false
        }
        if (isNaN(+answer3)){
            log(`${answer3} 不是数字, 请检查输入!`)
            return false
        }
        return true
    }

    let answer1 = await utils.getAnswer('请输入路径起点.')
    let answer2 = await utils.getAnswer('请输入路径终点.')
    let answer3 = await utils.getAnswer('请输入路径长度.')
    let yes = await utils.yesOrNo(`确定添加从 ${answer1} 到 ${answer2} 的 ${answer3} 米路径吗`)
    if (yes && isValid())
        graph.addEdgeOrNewVert(answer1, answer2, answer3)
    else
        start()
}




module.exports = AdminMenu = {inputNewEdge}