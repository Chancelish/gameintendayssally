/*global Entity GameImage MyGame */
class Bridge extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["bridge"]);
        this.setHitBox(128, 32);
        this.setType("platform");
    }
    update(_dt) {
        if (this.collideTypes("apple", this.x, this.y)) {
            this.destroy();
            MyGame.snds["crack"].play();
        }
    }
}