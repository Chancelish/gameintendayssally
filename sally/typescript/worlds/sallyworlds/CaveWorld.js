/* global World MyGame GridMask TiledImage Entity HitBox Sally*/
class CaveWorld extends World {
    constructor(lvl_id, _x, _y) {
        super();
        this.sx = _x;
        this.sy = _y;
        let xmlData = MyGame.maps[lvl_id].responseXML;
        let elem = xmlData.getElementsByTagName("level");
        this.setSize(parseInt(elem[0].getAttribute("width"), 10), parseInt(elem[0].getAttribute("height"), 10));
        elem = xmlData.getElementsByTagName("grid");
        let wm = new GridMask(0, 0, 64, Math.ceil(this.width / 64), Math.ceil(this.height / 64));
        wm.loadFromString(elem[0].innerHTML);
        elem = xmlData.getElementsByTagName("tiles");
        let wr = new TiledImage(MyGame.imgs["tiles"], this.width/64, this.height/64, 64);
        wr.loadFromString(elem[0].innerHTML);
        let wall = new Entity(0, 0, wr, wm);
        wall.setType("wall");
        elem = xmlData.getElementsByTagName("flower_spot");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new GiantFlower(x, y));
        }
        elem = xmlData.getElementsByTagName("wincon");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new Vine(x, y));
        }
        this.addEntity(wall);
        elem = xmlData.getElementsByTagName("platform");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            let p = new Entity(x, y, null, new HitBox(x, y, parseInt(elem[i].getAttribute("width"), 10), 16));
            p.setType("platform");
            this.addEntity(p);
        }
        elem = xmlData.getElementsByTagName("spikes");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            let p = new Entity(x, y, null, new HitBox(x, y, parseInt(elem[i].getAttribute("width"), 10), 32));
            p.setType("spikes");
            this.addEntity(p);
        }
        elem = xmlData.getElementsByTagName("walkway");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new WalkWay(x, y, parseInt(elem[i].getAttribute("width"), 10), parseInt(elem[i].getAttribute("height"),10), parseInt(elem[i].getAttribute("target"),10), parseInt(elem[i].getAttribute("targetX"),10), parseInt(elem[i].getAttribute("targetY"),10)))
        }
        elem = xmlData.getElementsByTagName("staff");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            if (!Sally.hasStaff) {
                this.addEntity(new Staff(x, y));
            }
        }
        elem = xmlData.getElementsByTagName("apple");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new Apple(x, y));
        }
        elem = xmlData.getElementsByTagName("bridge");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new Bridge(x, y));
        }
        elem = xmlData.getElementsByTagName("lizard");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new Lizard(x, y));
        }
        elem = xmlData.getElementsByTagName("stache");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10);
            let y = parseInt(elem[i].getAttribute("y"), 10);
            this.addEntity(new RockyFellow(x, y));
        }
        this.addEntity(new Sally(_x, _y));
    }
}
CaveWorld.index = 0;
CaveWorld.grownPlant = [];