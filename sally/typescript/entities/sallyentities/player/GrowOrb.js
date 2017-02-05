/* global Entity MyGame GameImage CaveWorld */
class GrowOrb extends Entity {
    constructor(_x, _y, _s) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["grow_orb"]);
        this.setHitBox(32, 32);
        this.setXSpeed(_s);
    }
    update(_dt) {
        this.moveBy(this.getXSpeed(), 0);
        this.mask.update(this.x, this.y);
        if (this.collideTypes("wall", this.x, this.y)) {
            this.destroy();
        }
        let other = this.collideTypes(["enemy", "lizard", "flower", "apple"], this.x, this.y);
        if (!other) {
            return;
        }
        else {
            MyGame.snds["foomph"].play();
            other.onCollision(1, "grow");
            this.destroy();
        }
    }
}