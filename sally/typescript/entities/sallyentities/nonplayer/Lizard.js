/* global BaseMobile GameSprite MyGame */
class Lizard extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.faceRight = false;
        this.onGround = false;
        this.gravity = 0.6;
        this.drag = 0.2;
        this.sprites = 0;
        this.big = 0;
        this.chompTimer = 0;
        this.swallowing;
        this.setXSpeed(-5);
        this.sprites = [];
        this.addSprite("tiny_lizard", 48, 24);
        this.addSprite("giant_lizard", 192, 96);
        this.image = this.sprites[0];
        this.setHitBox(48, 24);
        this.setType("lizard");
    }
    addSprite(_name, _w, _h) {
        let s = new GameSprite(MyGame.imgs[_name], _w, _h);
        s.add("walk_l", [0, 1, 2, 3, 4, 5, 6]);
        s.add("walk_r", [12, 13, 14, 15, 16, 17, 18]);
        s.add("chomp_l", [7, 8, 9, 10, 11, 11, 11]);
        s.add("chomp_r", [19, 20, 21, 22, 23, 23, 23]);
        s.add("open_l", [7]);
        s.add("open_r", [19]);
        this.sprites.push(s);
    }
    update(_dt) {
        this.image.update(_dt);
        if (!this.collideTypes(["wall", "platform"], this.x + 10 * this.getXSpeed() + 40 * this.big * this.getXSpeed(), this.y + 1) || this.collideTypes(["wall"], this.x + this.getXSpeed(), this.y)) {
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
            let other = this.collideTypes("player", this.x, this.y);
            if (other) {
                this.swallowing = true;
                if (this.x + this.width/2 > other.x + other.width/2) {
                    this.faceRight = false;
                    this.setXSpeed(0);
                    this.image.play("chomp_l", 7, false);
                    other.x = this.x - 16;
                    other.y = this.y + 32;
                }
                else {
                    this.faceRight = true;
                    this.setXSpeed(0);
                    this.image.play("chomp_r", 7, false);
                    other.x = this.x + this.width - 16;
                    other.y = this.y + 32;
                }
                if (other.alive) {
                    if (this.image.animationFrame == 1) {
                        MyGame.snds["ow"].play();
                        other.staff.visible = false;
                        other.alive = false;
                        other.swallowed = true;
                        other.iFrames = 48;
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
    onCollision() {
        if (this.big === 0) {
            this.big = 1;
            this.x -= 60;
            this.y -= 72;
            this.setHitBox(192,96);
            this.image = this.sprites[this.big];
            if (this.faceRight) {
                this.image.play("walk_r", 15);
            }
            else {
                this.image.play("walk_l", 15);
            }
        }
    }
}