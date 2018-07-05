const readline = require('readline');
var fs = require('fs')


const reader = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function getChoice(callback) {
    if(callback)
        reader.once('line', callback)
    else return new Promise(resolve => {
        reader.once('line', resolve)
    })
}

function printOutFile(fileName){
    if(!fileName.endsWith('.out')){
        fileName += '.out'
    }
    var data = fs.readFileSync('./.out/'+ fileName)
    console.log(data.toString())    
}

async function yesOrNo(question){
    var noAnswer = true
    while(noAnswer){
        console.log(`${question}Y/N`)
        var yesOrNo = await getChoice()
        if(yesOrNo.toLowerCase() == 'y'){
            noAnswer = false
            return true
        }else if(yesOrNo.toLowerCase() == 'n'){
            noAnswer = false
            return false
        }else{
            console.log(`输入有误, 请重新输入!`)
        }
    }
}

async function interaction(inputHints, confirmInfoProducer, yesCall, noCall){
    var inputs = []
    for(var item of inputHints){
        console.log(item)
        inputs.push(await getChoice())
    }
    var confirmInfo = confirmInfoProducer(inputs)
    var yes = await yesOrNo(confirmInfo)
    if(yes)
        yesCall(inputs)
    else
        noCall(inputs)
}

function simpleInter(arr, str, func, noCall, thisArg){
    var argstr = '', argsArr = []
    for(var i = 0; i < arr.length; i++){
       str = str.replace('${'+ i +'}', '${input['+ i +']}')
       argstr += `args[${i}],`
    }
    argstr = argstr.substr(0, argstr.length - 1)
    str = '`'+ str + '`'
    var f = (input)=>{
        return eval(str)
    }
    if(thisArg)
        interaction(arr, f, 
            args => func.apply(thisArg, args),
            noCall
        )
    else
        interaction(arr, f, 
            args => eval(func + '('+ argstr + ')'),
            noCall
        )
}

module.exports = utils =  {getChoice, printOutFile, yesOrNo, interaction, simpleInter}