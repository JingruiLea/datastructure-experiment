var AdminMenu = require('./AdminMenu')
var {printOutFile, getChoice} = require('./utils')

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

function loginMenu(){
    var username,password
    printOutFile('MainMenu_login')
    console.log('请输入用户名:')
    getChoice(choice=>{
        username = choice
        console.log('请输入密码:')
        getChoice(choice=>{
            password = choice
            if(username == password){
                console.log('登陆成功')
                AdminMenu.start()
            }else{
                loginMenu()
            }
        })
    })
}

function init() {
    printOutFile('MainMenu')
}

module.exports = MainMenu = {start}