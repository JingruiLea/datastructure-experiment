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

function prim(graph, start){
    var result = [start], verts = graph.verts.concat(), paths =[]
    let index = verts.findIndex(ele => {
        return ele.name == start
    })
    verts.splice(index, 1)
    var time = verts.length
    for(var i = 0;i < time; i++){
        var minDis = 32768, vertNameAdd, path
        for(var vert of verts)
            for(var item of result){
                var disTemp = graph.getDistance(item, vert.name)
                if(minDis >= disTemp){
                    minDis = disTemp
                    vertNameAdd = vert.name
                    path = [item, vert.name]
                }
            }
        result.push(vertNameAdd)
        paths.push(path)
        minDis = 32768
        let index = verts.findIndex(ele => {
            return ele.name == vertNameAdd
        })
        verts.splice(index, 1)
    }
    console.log(result)
    console.log(paths)
}

class TreeNode{
    constructor(name){
        this.name = name
        this.childs = []
    }
}

class Tree{
    static frontTraversal(root, callback){
        callback(root)
        root.childs.forEach(item=>{
            frontTraversal(item, callback)
        })
    }
    
    static findNode(root, nodeName){
        if(nodeName == root.name)
            return root
        root.childs.forEach(item=>{
            findeNode(item, callback)
        })
    }
}
module.exports = algorithm = {dijkstra,prim,Tree,TreeNode}