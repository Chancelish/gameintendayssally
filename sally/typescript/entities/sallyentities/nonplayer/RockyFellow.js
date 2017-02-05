/* global BaseMobile GameSprite MyGame */
class RockyFellow extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.faceRight = true;
        this.onGround = false;
        this.gravity = 0.6;
        this.drag = 0.2;
        this.sprites = 0;
        this.big = 0;
        this.fallen = false;
        this.setXSpeed(5);
        this.smallStache = new GameSprite(MyGame.imgs["stache"], 64, 64);
        this.smallStache.add("walk_l", [0, 1, 2, 3]);
        this.smallStache.add("walk_r", [4, 5, 6, 7]);
        this.bigStache = new GameSprite(MyGame.imgs["stache_grown"], 122, 86);
        this.bigStache.add("fall_l", [0, 1, 2]);
        this.bigStache.add("fall_r", [5, 4, 3]);
        this.image = this.smallStache;
        this.image.play("walk_r", 15);
        this.setHitBox(64, 64);
        this.setType("enemy");
    }
    update(_dt) {
        this.image.update(_dt);
        if (!this.collideTypes(["wall", "platform"], this.x + 10 * this.getXSpeed(), this.y + 1) || this.collideTypes(["wall"], this.x + this.getXSpeed(), this.y)) {
            if (this.faceRight) {
                this.setXSpeed(-5);
                this.faceRight = false;
                this.image.play("walk_l", 15);
            }
            else if (!this.faceRight) {
                this.setXSpeed(5);
                this.faceRight = true;
                this.image.play("walk_r", 15);
            }
        }
        if (this.big) {
            if (this.image.currentFrame === 2 || this.image.currentFrame === 3) {
                if (!this.fallen) {
                    this.fallen = true;
                    this.image.stop();
                    MyGame.snds["foomph"].pause();
                    MyGame.snds["foomph"].currentTime = 0;
                    MyGame.snds["argh"].play();
                    if (this.faceRight) {
                        this.image.currentFrame = 3;
                    }
                    else {
                        this.image.currentFrame = 2;
                    }
                }
            }
        }
        if (!this.checkOnGround()) {
            this.setYSpeed(this.getYSpeed() + this.gravity / 3 - this.getYSpeed() * this.drag);
        }
        else {
            this.setYSpeed(0);
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        this.setType(null);
        this.image = this.bigStache;
        this.big = 1;
        this.setXSpeed(0);
        this.x -= 28;
        this.y -= 22;
        this.setHitBox(122, 86);
        if (this.faceRight) {
            this.image.play("fall_r", 7, false);
        }
        else {
            this.image.play("fall_l", 7, false);
        }
    }
}