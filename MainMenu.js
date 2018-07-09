var AdminMenu = require('./AdminMenu')
var {printOutFile, getChoice} = require('./utils')
var utils = require('./utils')
var graph = require('./Graph')
var algorithm = require('./algorithm');


function start(){
    printOutFile('MainMenu')
    getChoice(choice=>{
        switch(choice){
            case '1':
                loginMenu()
            break
            case '2':
                graph.print()
            break
            case '3':
                guide()
            break
            case '4':

            break
            case '5':
                minDistance()
            break
            case '6':

            break
            case '0':
                quit()
            break
            default:
                console.log('输入错误,请重新输入!')
                start()
        }
    })
}

async function guide(){
    var isValid = (from,to)=>{
        if(from == to){
            console.log('起点终点相同!')
            return false
        }
        if(!graph.findVert(from)){
            console.log(`不存在景点 ${from}!`)
            return false
        }
        if(!graph.findVert(to)){
            console.log(`不存在景点 ${to}!`)
            return false
        }
        return true
    }

    let success = false
    while(!success){
        success = true
        let from = await utils.getAnswer('请输入起点名称: (输入quit退出)')
        if(from == 'quit'){
            break
        }
        let to = await utils.getAnswer('请输入终点名称: (输入quit退出)')
        if(to == 'quit'){
            break
        }
        if(isValid(from,to)){
            console.log(algorithm.minimumCost(graph, from, to))
        }else{
            success = false
            console.log(`请重新输入!`)
        }
    }
    MainMenu.start()
}

async function quit() {
    let yes = await utils.yesOrNo('确定退出吗?')
    if (yes) {
        process.exit(0)
    } else {
        start()
    }
}

async function minDistance(){
    var isValid = (from,to)=>{
        if(from == to){
            console.log('起点终点相同!')
            return false
        }
        if(!graph.findVert(from)){
            console.log(`不存在景点 ${from}!`)
            return false
        }
        if(!graph.findVert(to)){
            console.log(`不存在景点 ${to}!`)
            return false
        }
        return true
    }

    let success = false
    while(!success){
        success = true
        let from = await utils.getAnswer('请输入起点名称: `(输入quit退出)`')
        if(from == 'quit') break
        let to = await utils.getAnswer('请输入终点名称: (输入quit退出)')
        if(to == 'quit') break
        if(isValid(from,to)){
            console.log(graph.findPath(from, to))
        }else{
            success = false
            console.log(`请重新输入!`)
        }
    }
    MainMenu.start()
}

async function loginMenu(){
    printOutFile('MainMenu_login')
    let username = await utils.getAnswer('请输入用户名: (输入quit退出)')
    if(username == 'quit') MainMenu.start()
    let password = await utils.getAnswer('请输入密码: (输入quit退出)')
    if(password == 'quit') MainMenu.start()
    if(username == password){
        console.log('登陆成功!')
        AdminMenu.start()
    }else{
        console.log('用户名或密码错误!')
        loginMenu()
    }
}


module.exports = MainMenu = {start}