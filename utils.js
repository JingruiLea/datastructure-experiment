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

function getAnswer(question){
    console.log(question)
    return new Promise(resolve => {
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
        console.log(`${question} Y/N`)
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
    var answers = []
    for(var item of inputHints){
        answers.push(await getAnswer(item))
    }
    var confirmInfo = confirmInfoProducer(answers)
    var yes = await yesOrNo(confirmInfo)
    if(yes)
        return yesCall(answers)
    else
        noCall(answers)
}

async function simpleInter(arr, str, yesCall, noCall, thisArg){
    for(var i = 0; i < arr.length; i++){
       str = str.replace('${'+ i +'}', '${input['+ i +']}')
    }
    str = '`'+ str + '`'
    var f = (input)=>{
        return eval(str)
    }
    return await interaction(arr, f, 
        args => yesCall.apply(thisArg, args),
        noCall
    )
}

module.exports = utils =  {getChoice, printOutFile, yesOrNo, interaction, simpleInter, getAnswer}