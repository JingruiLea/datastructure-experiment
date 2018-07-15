var carPark = require('./CarPark')
var {printOutFile, getAnswer} = require('./utils')
var MainMenu = require('./MainMenu')

CarParkMenu = {
    start(){
        printOutFile('./.out./CarParkMenu.out')
        getChoice(choice=>{
            switch(choice){
                case '1':
                    carEnter()
                break
                case '2':
                    carOut()
                break
                case '3':
                    carLog()
                break
                case '4':
                    showPark()
                break
                case '5':
                    showDetour()
                break
                case '0':
                    quit()
                break
                default:
                    start()
                    console.log('输入错误,请重新输入!')
            }
        })
    },

    async carEnter(){
        if(carPark.park.length == carPark.MAX_SIZE)
            console.log('停车场满了!!!')
        carPark.carEnter(await getAnswer('请输入车牌号!'))
        console.log('进入成功!')
        start()
    },

    async carOut(){
        let succ = carPark.carOut(await getAnswer('请输入车牌号!'))
        if(succ)
            console.log('出车成功!')
        else
            console.log('没这个车!')
        start()
    },

    carLog(){
        console.log(carPark.log)
        start()
    },

    showPark(){
        console.log(carPark.park)
        start()
    },

    showDetour(){
        console.log(carPark.detour)
        start()
    },
    
    quit(){
        MainMenu.start()
    }
}

module.exports = CarParkMenu