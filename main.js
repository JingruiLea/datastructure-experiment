var Graph = require('./Graph')
var MainMenu = require('./MainMenu')
const readline = require('readline');
var {dijkstra} = require('./algorithm');

var graph = new Graph('./data.dat')
//graph.print()
 //graph.findVert('北门').travalseDistination(node=>console.log(node.name))
//MainMenu.start()
console.log(graph.findPath('北门','碧水潭'))

// this.reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// this.reader.on('line', choice => {
//     //reader.close();
// })

// this.reader.on('line', choice => {
//     //reader.close();
// })
