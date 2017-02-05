/* global Entity CaveWorld MyGame GameImage */
class Vine extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.setHitBox(64, 256);
        this.image = new GameImage(MyGame.imgs["vine"]);
        this.setType("flower");
        this.text = "Perhaps I can make that vine grow.";
    }
    update(_dt) {
        let size = CaveWorld.grownPlant[4] + CaveWorld.grownPlant[9] + CaveWorld.grownPlant[12] + CaveWorld.grownPlant[15];
        this.y = 224;
        if (size === 1) {
            this.y = 192;
            this.text = "There must be a way to make it grow more.";
        }
        else if (size === 2) {
            this.y = 128;
            this.text = "There must be a way to make it grow more.";
        }
        else if (size === 3) {
            this.y = 64;
            this.text = "Almost there."
        }
        else if (size === 4) {
            this.y = 0;
        }
        if (this.collideTypes("player", this.x, this.y) || size === 0) {
            this.textVisible = true;
            if (size === 4) {
                MyGame.setWorld(new VictoryScreen());
            }
        }
        else {
            this.textVisible = false;
        }
    }
    render(_g) {
        if (this.textVisible) {
            _g.text(this.text, 96, 96, "#000000", "24px Verdana");
        }
        super.render(_g);
    }
    onCollision(dmg, _type) {
        this.visible = true;
        CaveWorld.grownPlant[CaveWorld.index] = 1;
    }
}