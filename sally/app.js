/* global KeyManager Graphics TiledImage World Eduardo localStorage Image SplashScreen*/
class MyGame {
    constructor(width = 768, height = 512, scale = 1) {
        MyGame.WIDTH = width;
        MyGame.HEIGHT = height;
        MyGame.SCALE = scale;
        this.camera = new Point(0, 0);
        MyGame.camera = this.camera; // default camera
        this.keyManager = new KeyManager();
        this.g = new Graphics(width, height, scale);
        this.state = 1;
        this.imgCount = 0;
        this.imgsToLoad = 0;
        this.lvlCount = 0;
        this.lvlsToLoad = 0;
        this.gameLoop = () => {
            if (this.running) {
                this.now = Date.now();
                this.delta = this.now - this.lastTime;
                this.timer += this.delta;
                this.lastTime = this.now;
                while (this.timer >= this.timePerTick) {
                    this.update(this.timePerTick / 1000);
                    this.timer -= this.timePerTick;
                    if (this.timer < this.timePerTick) {
                        this.render();
                    }
                }
            }
            requestAnimationFrame((this.gameLoop));
        };
    }
    start() {
        this.onInit();
        this.timePerTick = 1000 / 60;
        this.running = true;
        this.now = Date.now();
        this.delta = 0;
        this.timer = 0;
        this.lastTime = this.now;
        this.gameLoop();
    }
    /**
     * Override this to set your own world and other variables.
     */
    onInit() {
        MyGame.world = new SplashScreen();
    }
    update(_dt) {
        KeyManager.preUpdate("ArrowUp");
        KeyManager.preUpdate("ArrowDown");
        KeyManager.preUpdate("ArrowLeft");
        KeyManager.preUpdate("ArrowRight");
        KeyManager.preUpdate("Up");
        KeyManager.preUpdate("Down");
        KeyManager.preUpdate("Left");
        KeyManager.preUpdate("Right");
        KeyManager.preUpdate("Enter");
        KeyManager.preUpdate("Escape");
        KeyManager.preUpdate("Space");
        KeyManager.preUpdate("x");
        KeyManager.preUpdate("z");
        if (MyGame.world) {
            MyGame.world.update(_dt);
            MyGame.world.cleanup();
        }
        KeyManager.postUpdate("ArrowUp");
        KeyManager.postUpdate("ArrowDown");
        KeyManager.postUpdate("ArrowLeft");
        KeyManager.postUpdate("ArrowRight");
        KeyManager.postUpdate("Up");
        KeyManager.postUpdate("Down");
        KeyManager.postUpdate("Left");
        KeyManager.postUpdate("Right");
        KeyManager.postUpdate("Enter");
        KeyManager.postUpdate("Escape");
        KeyManager.postUpdate("Space");
        KeyManager.postUpdate("x");
        KeyManager.postUpdate("z");
    }
    render() {
        this.g.clear();
        this.g.rectangle(0, 0, MyGame.WIDTH, MyGame.HEIGHT, MyGame.color);
        if (MyGame.world) {
            MyGame.world.render(this.g);
        }
    }
    /**
     * Adds an image to the game and stores it as an html Image element
     * @param _key  The name of the image to reference in game
     * @param _path The relative filepath of the image.
     */
    addImage(_key, _path) {
        MyGame.imgs[_key] = new Image();
        MyGame.imgs[_key].onload = () => this.imageLoaded();
        MyGame.imgs[_key].src = _path;
        this.imgsToLoad++;
    }
    /**
     * Adds a level to the game and stores as an xml request
     * @param _key
     * @param _path
     */
    addLevelXML(_key, _path) {
        MyGame.maps[_key] = new XMLHttpRequest();
        MyGame.maps[_key].onreadystatechange = () => this.levelLoaded(_key);
        MyGame.maps[_key].open("GET", _path);
        MyGame.maps[_key].responseType = "document";
        MyGame.maps[_key].send();
        this.lvlsToLoad++;
    }
    /**
     * Override This: Loads in images and levels.
     */
    loadImages() {
        this.addImage("apple", "./assets/gfx/apple_32x32x2.png");
        this.addImage("bridge", "./assets/gfx/breakable_bridge_64x16.png");
        this.addImage("giant_flower", "./assets/gfx/giant_flower_32x32.png");
        this.addImage("giant_lizard", "./assets/gfx/giant_lizard_96x48x24.png");
        this.addImage("grow_orb", "./assets/gfx/groworb_16x16.png");
        this.addImage("sally", "./assets/gfx/sally_16x32x8.png");
        this.addImage("stache", "./assets/gfx/stache_32x32x8.png");
        this.addImage("stache_grown", "./assets/gfx/stache_grown_61x43x6.png");
        this.addImage("staff", "./assets/gfx/staff_of_growth_13x21.png");
        this.addImage("staff_use", "./assets/gfx/staff_use_21x7x2.png");
        this.addImage("tiles", "./assets/gfx/grayscale_tiles.png");
        this.addImage("tiny_lizard", "./assets/gfx/tiny_lizard_24x12x24.png");
        this.addImage("vine", "./assets/gfx/wincon_vine_32x128.png");
        MyGame.snds["argh"] = new Audio();
        MyGame.snds["argh"].src = "./assets/snd/arggh.wav";
        MyGame.snds["crack"] = new Audio();
        MyGame.snds["crack"].src = "./assets/snd/crack.wav";
        MyGame.snds["foomph"] = new Audio();
        MyGame.snds["foomph"].src = "./assets/snd/foomph.wav";
        MyGame.snds["ow"] = new Audio();
        MyGame.snds["ow"].src = "./assets/snd/ow.wav";
        MyGame.snds["music"] = new Audio();
        MyGame.snds["music"].src = "./assets/snd/the_field_of_dreams_by_pouliuw.mp3";
    }
    loadLevels() {
        this.addLevelXML("cave_0", "./assets/levels/cave_0.xml");
        this.addLevelXML("cave_1", "./assets/levels/cave_1.xml");
        this.addLevelXML("cave_2", "./assets/levels/cave_2.xml");
        this.addLevelXML("cave_3", "./assets/levels/cave_3.xml");
        this.addLevelXML("cave_4", "./assets/levels/cave_4.xml");
        this.addLevelXML("cave_5", "./assets/levels/cave_5.xml");
        this.addLevelXML("cave_6", "./assets/levels/cave_6.xml");
        this.addLevelXML("cave_7", "./assets/levels/cave_7.xml");
        this.addLevelXML("cave_8", "./assets/levels/cave_8.xml");
        this.addLevelXML("cave_9", "./assets/levels/cave_9.xml");
        this.addLevelXML("cave_10", "./assets/levels/cave_10.xml");
        this.addLevelXML("cave_11", "./assets/levels/cave_11.xml");
        this.addLevelXML("cave_12", "./assets/levels/cave_12.xml");
        this.addLevelXML("cave_13", "./assets/levels/cave_13.xml");
        this.addLevelXML("cave_14", "./assets/levels/cave_14.xml");
        this.addLevelXML("cave_15", "./assets/levels/cave_15.xml");
    }
    imageLoaded() {
        this.imgCount += 1;
        console.log(this.imgCount);
        if (this.imgCount >= this.imgsToLoad && !this.running) {
            this.loadLevels();
        }
    }
    levelLoaded(s) {
        if (MyGame.maps[s].status == 200) {
            this.lvlCount += 1;
            console.log(this.lvlCount);
            if (this.lvlCount >= this.lvlsToLoad && !this.running) {
                this.start();
            }
        }
        else {
        }
    }
    static setWorld(_w) {
        MyGame.world = _w;
        _w.begin();
    }
    /* Saves game data to local storage, override to manage own data */
    static saveGame() {
        
        
    }
    /* loads game from local storage if availible */
    static loadGame() {
        
        
    }
    static reset() {
        
        
    }
}
MyGame.WIDTH = 768;
MyGame.HEIGHT = 576;
MyGame.SCALE = 1;
MyGame.world = null;
MyGame.color = "#000000";
MyGame.imgs = [];
MyGame.maps = [];
MyGame.snds = [];
MyGame.textLanguage = "English";
window.onload = () => {
    var myGame = new MyGame();
    myGame.imgCount = 0;
    myGame.loadImages();
};
//provided for convenience
class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    setP(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}
