class CarPark{
    constructor(){
        this.park = []
        this.tempPark = []
        this.detour = []
        this.log = []
    }

    carEnter(name){
        if(this.park.length == MAX_SIZE){
            this.detour.push(name)  
        }else{
            this.park.push(name)
        }
        log.push(`enter a car ${name} at ${new Date().getTime()}`)
    }

    carOut(name){
        let succ = false
        while(this.park.length > 0){
            let car = this.park.pop()
            if(item == name){
                log.push(`out a car ${name} at ${new Date().getTime()}`)
                succ = true
                break
            }
            this.tempPark.push(car)
        }
        while(this.tempPark.length > 0){
            let car = this.tempPark.pop()
            this.park.push(car)
        }
        if(this.detour.length > 0){
            this.park.push(this.detour.shift())
        }
        return succ
    }
}
CarPark.MAX_SIZE = 10
module.exports = new CarPark() 