/* global Entity MyGame KeyManager CaveWorld */
class WalkWay extends Entity {
    constructor(_x, _y, _w, _h, _i, _tx, _ty) {
        super(_x, _y);
        this.setHitBox(_w, _h);
        this.index = _i;
        this.level = "cave_" + _i.toString();
        this.targetX = _tx;
        this.targetY = _ty;
    }
    update(_dt) {
        if (this.collideTypes("player", this.x, this.y)) {
            CaveWorld.index = this.index;
            MyGame.setWorld(new CaveWorld(this.level, this.targetX, this.targetY));
        }
    }
}