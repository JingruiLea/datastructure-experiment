const readline = require('readline');
var fs = require('fs')

const reader = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

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
                console.log('success')
            }
        })
    })
}

function init() {
    printOutFile('MainMenu')
}

function printOutFile(fileName){
    if(!fileName.endsWith('.out')){
        fileName += '.out'
    }
    var data = fs.readFileSync('./.out/'+ fileName)
    console.log(data.toString())    
}

var temp

function getChoice(callback) {
    temp = callback
    reader.once('line', line=>{
        callback(line)
    })
}


module.exports = MainMenu = {start}