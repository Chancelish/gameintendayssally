/* global World KeyManager MyGame CaveWorld Sally */
class SplashScreen extends World {
    constructor() {
        super();
        this.titleText = "Sally Fell Down a Hole";
        this.tagLine = "(and Must Find a Way Out)";
        this.instruction = "Press Enter";
        this.credit = [];
        this.credit[0] = "Made for Game in Ten Days 62";
        this.credit[1] = "Music by Pauliuw on opengameart.org"
        this.page = 0;
    }
    update(_dt) {
        super.update();
        if(KeyManager.pressed("Enter")) {
            if (this.page === 0) {
                this.loadPage(0);
            }
            else {
                MyGame.color = "#FFFFFF";
                Sally.hasStaff = false;
                CaveWorld.index = 0;
                CaveWorld.grownPlant[4] = 0;
                CaveWorld.grownPlant[9] = 0;
                CaveWorld.grownPlant[12] = 0;
                CaveWorld.grownPlant[15] = 0;
                MyGame.snds["music"].play();
                MyGame.snds["music"].addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                MyGame.setWorld(new CaveWorld("cave_0", 768/2, 32));
            }
        }
    }
    render(_g) {
        super.render(_g);
        if (this.page === 0) {
            _g.text(this.titleText, 170, 64);
            _g.text(this.tagLine, 185, 96, "#FFFFFF", "24px Verdana");
            _g.text(this.instruction, 270, 384, "#FFFFFF", "24px Verdana");
            _g.text(this.credit[0], 160, 416, "#FFFFFF", "24px Verdana");
            _g.text(this.credit[1], 102, 448, "#FFFFFF", "24px Verdana");
        }
        else {
            for (let i = 0; i < this.instruction.length; i++) {
                _g.text(this.instruction[i], 64, 64+32*i, "#FFFFFF", "24px Verdana");
            }
        }
    }
    loadPage(page) {
        this.instruction = [];
        this.instruction[0] = "Controls";
        this.instruction[1] = "Arrows: Move";
        this.instruction[2] = "Z or Space: Jump";
        this.instruction[3] = "X: Use Staff of Growth";
        this.instruction[4] = "Press Enter to Start";
        this.page = 1;
    }
}