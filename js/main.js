paper.install(window);
window.vvvs = []
window.graph = []
window.positions = [
["北门",531,56],
["狮子山",400,119],
["仙云石",845,102],
["一线天",238,229],
["飞流瀑",518,242],
["仙武湖",685,175],
["九曲桥",1004,273],
["观云台",536,427],
["花卉园",237,510],
["红叶亭",555,632],
["碧水亭",813,415],
["朝日峰",950,564],
["碧水潭",857,694]
]

function deleteVert(name){
    $.ajax({url:`/deleteVert?vertname=${name}`})
}

function Button(label, x, y){
    this.label = label
    this.text = new PointText({
        point: [x, y],
        content: label,
        fillColor: 'deeppink',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 16
    })
    this.text.onMouseEnter = e => this.text.fillColor = 'red'
    this.text.onMouseLeave = e => this.text.fillColor = 'deeppink'
}

function site(name,x,y){
    this.name = name
    this.modifying = false
    this.circle = new Path.Circle({
        center: [x, y],
        radius: 30,
        strokeColor: 'black',
        fillColor: '#e8eef7'
    });
    this.text = new PointText({
        point: [x - 22, y + 6],
        content: name,
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 15
    });
    this.g = new Group(this.circle, this.text)
    positions.forEach(i=>{
        if(i[0]==this.name){
            this.g.position.x = i[1]
            this.g.position.y = i[2]
        }
    })
    this.deleteButton = new Button('删除', this.g.position.x + 32, this.g.position.y  + 10)
    this.deleteButton.text.onClick = e =>{
        deleteVert(this.name)
    }
    this.deleteButton.text.visible = false
    var that = this
    this.g.onMouseDrag = this.modifying? (e)=>{
        that.g.position.x += e.delta.x
        that.g.position.y += e.delta.y
        this.deleteButton.text.position.x += e.delta.x
        this.deleteButton.text.position.y += e.delta.y
        that.starts.forEach(function(p){
            p.firstSegment.point.x += e.delta.x
            p.firstSegment.point.y += e.delta.y
            let angle =  getAngle(p)
            p.text.point.x += e.delta.x/2
            p.text.point.y += e.delta.y/2
            while(p.text.intersects(p)){
                p.text.point.x += (0.3)
                p.text.point.y -= (0.3 * angle)
            }
        })
        that.ends.forEach(function(p){
            p.lastSegment.point.x += e.delta.x
            p.lastSegment.point.y += e.delta.y
            let angle =  getAngle(p)
            p.text.point.x += e.delta.x/2
            p.text.point.y += e.delta.y/2
            while(p.text.intersects(p)){
                p.text.point.x += (0.3)
                p.text.point.y -= (0.3 * angle)
            }
        })
        positions = []
        for(let i of vvvs){
            positions.push([i.name,i.g.position.x,i.g.position.y])
        }
    }:() => {}
    this.clicked = false
    this.g.onClick = this.modifying ? e => {
        if(!this.clicked){
            this.clicked = true
            this.deleteButton.text.visible = true
        }else{
            this.deleteButton.text.visible = false
            this.clicked = false
        }
        
    }:() => {}
    this.starts = [] //以该点为起点的线对象
    window.sss = this.starts
    this.ends = []   //以该点为终点的线对象
    vvvs.push(this)
}

function displayPath(v1, v2){
    graph.verts.forEach(ele=>{
        if(ele.name == v1 || ele.name == v2){
            ele.site.circle.fillColor = 'red'
            ele.traversalDestination(e=>{
                if(e.name == v2){
                    e.path.style.strokeColor = 'red'
                }
            })
        }
    })
    //if input an array
    if(!v2){
        v1.forEach((e,index)=>{
            if(v1[index + 1])
                displayPath(e, v1[index + 1])
        })
    }
}


function getSite(name) {
    var i = vvvs.findIndex(ele => {
        return (ele.name == name)
    })
    return vvvs[i]
}

function makePath(s1name, s2name, length){
    let s1, s2
    vvvs.forEach(ele=>{
        if(ele.name == s1name)
            s1 = ele
        if(ele.name == s2name)
            s2 = ele
    })
    var p = new Path({segments:[s1.g.position, s2.g.position], strokeColor:'black',strokeWidth:6})
    s1.g.bringToFront()
    s2.g.bringToFront()
    var tpx = (s1.g.position.x + s2.g.position.x)/2
    var tpy = (s1.g.position.y + s2.g.position.y)/2
    if(!length) length = 0
    var text = new PointText({
        point: [tpx, tpy],
        content: length,
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 15
    });
    p.text = text
    let angle =  getAngle(p)
    while(text.intersects(p)){
        text.point.x += (0.3)
        text.point.y -= (0.3 * angle)
    }
    s1.starts.push(p)
    s2.ends.push(p)
    return p
} 

function getAngle(p){
    let dx = p.firstSegment.point.x - p.lastSegment.point.x
    let dy = p.firstSegment.point.y - p.lastSegment.point.y
    return dx/dy
}

function initGraph(){
    graph = JSON.parse(`{"verts":[{"name":"北门","firstEdge":{"name":"狮子山","length":9,"next":{"name":"仙云石","length":8,"next":null}}},{"name":"狮子山","firstEdge":{"name":"北门","length":9,"next":{"name":"一线天","length":7,"next":{"name":"飞流瀑","length":6,"next":null}}}},{"name":"仙云石","firstEdge":{"name":"北门","length":8,"next":{"name":"仙武湖","length":4,"next":{"name":"九曲桥","length":5,"next":null}}}},{"name":"一线天","firstEdge":{"name":"狮子山","length":7,"next":{"name":"观云台","length":11,"next":{"name":"花卉园","length":10,"next":null}}}},{"name":"飞流瀑","firstEdge":{"name":"狮子山","length":6,"next":{"name":"观云台","length":3,"next":null}}},{"name":"仙武湖","firstEdge":{"name":"仙云石","length":4,"next":{"name":"九曲桥","length":7,"next":{"name":"碧水亭","length":20,"next":null}}}},{"name":"九曲桥","firstEdge":{"name":"仙云石","length":5,"next":{"name":"仙武湖","length":7,"next":{"name":"朝日峰","length":20,"next":null}}}},{"name":"观云台","firstEdge":{"name":"一线天","length":11,"next":{"name":"飞流瀑","length":3,"next":{"name":"红叶亭","length":15,"next":{"name":"碧水亭","length":16,"next":null}}}}},{"name":"花卉园","firstEdge":{"name":"一线天","length":10,"next":{"name":"红叶亭","length":9,"next":null}}},{"name":"红叶亭","firstEdge":{"name":"观云台","length":15,"next":{"name":"花卉园","length":9,"next":{"name":"朝日峰","length":10,"next":null}}}},{"name":"碧水亭","firstEdge":{"name":"观云台","length":16,"next":{"name":"仙武湖","length":20,"next":{"name":"朝日峰","length":17,"next":null}}}},{"name":"朝日峰","firstEdge":{"name":"碧水亭","length":17,"next":{"name":"红叶亭","length":10,"next":{"name":"九曲桥","length":20,"next":null}}}}]}`)
    graph.verts.forEach(i=>{
        let name = i.name
        i.site = new site(name, 50, 50)
    })
    var cache = []
    graph.verts.forEach(i=>{
        i.__proto__ = {}
        i.__proto__.traversalDestination = function(callback){
            var cur = this.firstEdge
            var before = null
            while(cur){
                let result
                if(result = callback(cur, before))
                    return result
                before = cur
                cur = cur.next
            }
        }
        i.traversalDestination(e => {
            e.__proto__ = {}
            if(cache.findIndex(ee=>{return ee[0]==e.name&&ee[1]==i.name}) < 0)
                e.path = makePath(i.name, e.name, e.length)
            cache.push([i.name,e.name])
        })
    })
}

window.onload = function() {
    paper.setup('myCanvas');
    initGraph()
    view.draw();
}


