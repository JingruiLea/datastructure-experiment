var AdminMenu = require('./AdminMenu')
var {printOutFile, getChoice} = require('./utils')
var utils = require('./utils')


function start(){
    init()
    getChoice(choice=>{
        switch(choice){
            case '1':
                loginMenu()
            break
            case '2':
            break
            case '3':
            break
            case '4':
            break
            case '5':
            break
            case '6':
            break
            case '7':
            break
            case '0':
            break
            default:
                console.log('输入错误,请重新输入!')
                start()
        }
    })
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

function init() {
    printOutFile('MainMenu')
}

module.exports = MainMenu = {start}