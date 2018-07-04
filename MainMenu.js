const readline = require('readline');
var fs = require('fs')


class MainMenu {
    static init(){
        this.reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    static menu0() {
        var data = fs.readFileSync('./MainMenu.out')
        console.log(data.toString())    
    }

    static getChoice() {
        this.reader.question("", choice => {
            reader.close();
        })
    }
}

module.exports = MainMenu