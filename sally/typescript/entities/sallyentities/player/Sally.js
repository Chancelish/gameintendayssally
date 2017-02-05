/* global Entity GameSprite Image MyGame KeyManager CaveWorld */
class Sally extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.climbing = false;
        this.faceRight = true;
        this.attacking = false;
        this.onGround = false;
        this.swallowed = false;
        this.alive = true;
        this.drag = 0.02;
        this.gravity = 0.6;
        this.friction = 0.02;
        this.maxSpeed = 4;
        this.jumpPow = 0;
        this.cooldown = 0;
        this.iFrames = 0;
        this.setType("player");
        this.name = "Eduardo";
        this.setHitBox(28, 64, 1, 0);
        this.image = new GameSprite(MyGame.imgs["sally"], 32, 64);
        this.image.add("walk_r", [0, 1, 0, 2]);
        this.image.add("walk_l", [7, 5, 7, 6]);
        this.image.add("jump_r", [3]);
        this.image.add("jump_l" [4]);
        this.image.add("stand_r", [0]);
        this.image.add("stand_l", [7]);
        this.image.play("stand_r");
        let staffSprite = new GameSprite(MyGame.imgs["staff_use"], 42, 14);
        this.staff = new Entity(this.x + 30, this.y + 24, staffSprite);
        this.staff.visible = false;
    }
    added() {
        this.world.addEntity(this.staff);
    }
    update(_dt) {
        if (!this.alive) {
            if (this.iFrames <= 0) {
                MyGame.setWorld(new CaveWorld("cave_" + CaveWorld.index.toString(), this.world.sx, this.world.sy));
            }
            if (this.iFrames > 0) {
                this.iFrames--;
                if (this.iFrames % 2) {
                    this.visible = false;
                }
                else {
                    this.visible = true;
                }
                if (this.swallowed) {
                    this.visible = false;
                }
            }
            return;
        }
        this.staff.y = this.y + 24;
        if (this.faceRight) {
            this.staff.x = this.x + 30;
            this.staff.image.currentFrame = 0;
        }
        else {
            this.staff.x = this.x - 40;
            this.staff.image.currentFrame = 1;
        }
        if (this.cooldown > 0) {
            this.cooldown--;
            if (this.cooldown > 20) {
                this.staff.visible = true;
            }
            else {
                this.staff.visible = false;
            }
        }
        this.movement();
        this.collisions();
        this.image.update(_dt);
    }
    movement() {
        this.wallsAndPlatforms();
        this.controls();
        let ys = this.getYSpeed();
        let xs = this.getXSpeed();
        let fl = this.friction;
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
        this.setXSpeed(xs - xs * fl);
        this.moveBy(this.getXSpeed(), 0, "wall");
        if (this.getYSpeed() < 0) {
            this.moveBy(0, this.getYSpeed(), "wall");
        }
        else {
            this.setHitBox(28, 16, 1, 48);
            if (!this.collideTypes("platform", this.x, this.y)) {
                this.moveBy(0, this.getYSpeed(), ["wall", "platform"]);
            }
            else {
                this.moveBy(0, this.getYSpeed(), "wall");
            }
            this.setHitBox(28, 64, 1, 0);
        }
    }
    collisions() {
        if (!this.alive) {
            return;
        }
        let other = this.collideTypes(["enemy", "spikes", "item"], this.x, this.y);
        if (!other) {
            return;
        }
        if (other.getType() == "item") {
            other.collect();
        }
        if (other.getType() == "enemy" || other.getType() == "spikes") {
            MyGame.snds["ow"].play();
            this.alive = false;
            this.iFrames = 46;
        }
    }
    wallsAndPlatforms() {
        this.setHitBox(28, 16, 1, 48);
        this.onGround = false;
        this.drag = 0.018;
        if (this.getYSpeed() >= 0) {
            if (this.collideTypes("wall", this.x, this.y + 1)) {
                this.setOnGround();
            }
            else if (this.collideTypes("platform", this.x, this.y + 1) && !this.collideTypes("platform", this.x, this.y)) {
                this.setOnGround();
            }
        }
        this.setHitBox(28, 64, 1, 0);
        if (!this.onGround) {
            this.friction = 0.02;
            if (this.faceRight) {
                this.image.play("jump_r");
            }
            else {
                this.image.play("jump_l");
            }
        }
        if (this.collideTypes("wall", this.x + this.getXSpeed(), this.y)) {
            this.setXSpeed(0);
        }
    }
    controls() {
        let keyDown = false;
        if (KeyManager.held("ArrowLeft") || KeyManager.held("Left")) {
            this.friction = 0.1;
            keyDown = true;
            this.faceRight = false;
            if (this.getXSpeed() > -this.maxSpeed) {
                this.setXSpeed(this.getXSpeed() - 0.5);
            }
            if (this.onGround) {
                this.image.play("walk_l", 15);
            }
        }
        if (KeyManager.held("ArrowRight") || KeyManager.held("Right")) {
            this.friction = 0.1;
            keyDown = true;
            this.faceRight = true;
            if (this.getXSpeed() < this.maxSpeed) {
                this.setXSpeed(this.getXSpeed() + 0.5);
            }
            if (this.onGround) {
                this.image.play("walk_r", 15);
            }
        }
        if (KeyManager.pressed("ArrowUp") || KeyManager.pressed("z") || KeyManager.pressed("Space") || KeyManager.pressed("Up")) {
            if (this.onGround) {
                this.setYSpeed(-8);
                this.jumpPow = 15;
                this.onGround = false;
            }
        }
        else if (KeyManager.held("ArrowUp") || KeyManager.held("z") || KeyManager.held("Space") || KeyManager.held("Up")) {
            if (this.jumpPow > 0) {
                this.jumpPow -= 1;
                this.setYSpeed(-8);
            }
        }
        else {
            this.jumpPow = 0;
        }
        if (KeyManager.pressed("x")) {
            if (Sally.hasStaff && this.cooldown <= 0) {
                this.cooldown = 48;
                if (this.faceRight) {
                    this.world.addEntity(new GrowOrb(this.x + 60, this.y + 16, 9));
                }
                else {
                    this.world.addEntity(new GrowOrb(this.x - 20, this.y + 16, -9));
                }
            }
        } 
        if (!keyDown) {
            if (this.onGround && !this.attacking) {
                if (this.faceRight) {
                    this.image.play("stand_r");
                }
                else {
                    this.image.play("stand_l");
                }
            }
        }
    }
    setOnGround() {
        this.setYSpeed(0);
        this.onGround = true;
        this.friction = 0.30;
    }
}
Sally.hasStaff = false;