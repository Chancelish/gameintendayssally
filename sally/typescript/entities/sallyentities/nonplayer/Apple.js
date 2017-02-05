/* global BaseMobile GameSprite MyGame */
class Apple extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["apple"], 64, 64);
        this.setHitBox(48, 48, 8, 4);
        this.isBig = 0;
        this.setType("apple");
    }
    update(_dt) {
        let ys = this.getYSpeed();
        let dl = this.drag;
        if (!this.onGround) {
            ys = ys + this.gravity;
        }
        if (this.springTime > 0) {
            this.springTime -= 1;
            ys = -10;
        }
        ys -= ys * dl + ys * ys * ys * 0.0000018;
        this.setYSpeed(ys);
        this.moveBy(0, this.getYSpeed());
        this.mask.update(this.x + this.offsetX, this.y + this.offsetY);
    }
    onCollision(dmg, _type) {
        this.isBig = 1;
        this.image.currentFrame = 1;
        this.gravity = 0.6;
        this.drag = 0.02;
    }
}