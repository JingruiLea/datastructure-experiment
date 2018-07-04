var Graph = require('./Graph')

function dijkstra(graph, from){
    var s = [], t = []
    graph.verts.forEach(item => {
        if(item.name == from)
            s.push({name: item.name, distance: 0})
        else{
            let dis = graph.getDistance(from, item.name)
            t.push({name: item.name, distance: dis, path: []})
        }
    })
    var times = t.length
    for(let i = 0; i < times; i++){
        let minDis = 32767, nearestVert
        for(var item2 of t){
            if(minDis >= item2.distance){
                minDis = item2.distance
                nearestVert = item2
            }
        }
        t.splice(t.indexOf(nearestVert), 1)
        s.push(nearestVert)
        for(var item3 of t){
            let disTemp = graph.getDistance(nearestVert.name, item3.name)
            if(item3.distance > nearestVert.distance + disTemp){
                item3.distance = nearestVert.distance + disTemp
                nearestVert.path.forEach(item => item3.path.push(item))
                item3.path.push(nearestVert.name)
            }
        }
    }
    return s
}

module.exports = {dijkstra}