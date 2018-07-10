class CarPark{
    static MAX_SIZE = 10
    constructor(){
        this.park = []
        this.tempPark = []
        this.detour = []
    }

    carEnter(name){
        if(this.park.length == MAX_SIZE){
            this.detour.push(name)  
        }else{
            this.park.push(name)
        }
    }

    carOut(name){
        while(this.park.length > 0){
            let car = this.park.pop()
            if(item == name) break
            this.tempPark.push(car)
        }
        while(this.tempPark.length > 0){
            let car = this.tempPark.pop()
            this.park.push(car)
        }
        if(this.detour.length > 0){
            this.park.push(this.detour.shift())
        }
    }
}