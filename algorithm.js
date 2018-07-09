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
    if(s.length == 0) return []
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

function dfs(graph, from, to){
    result = []
    dfsRecursion([from], graph, from, to, result)
    return result
}

function dfsRecursion(result, graph, from, to, totalResult) {
    var vert = graph.findVert(from)
    vert.visited = true
    vert.traversalDestination((cur) => {
        if ((!graph.findVert(cur.name).visited)||cur.name == to) {
            result.push(cur.name)
            if (cur.name == to) {
                totalResult.push(JSON.parse(JSON.stringify(result)))
            } else {
                dfsRecursion(result, graph, cur.name, to, totalResult)
                graph.findVert(cur.name).visited = false
            }
            result.pop()
        }
    })
}

function minimumCost(graph,from,to){
    var paths = dfs(graph, from, to)
    var minCostIndex, minCost = Infinity
    paths.forEach((item,index)=>{
        if(item.length != graph.verts.length) return
        for(var dis=0,i=0; i<item.length-1; i++){
           dis += graph.getDistance(item[i],item[i+1])
        }
        if(dis < minCost){
            minCost = dis
            minCostIndex = index
        }     
    })
    return [paths[minCostIndex],minCost]
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
module.exports = algorithm = {dijkstra,prim,Tree,TreeNode,dfs,minimumCost}