/*global Entity GameImage MyGame CaveWorld */
class GiantFlower extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["giant_flower"]);
        this.setHitBox(32, 32);
        this.visible = false;
        this.setType("flower");
        if (CaveWorld.grownPlant[CaveWorld.index] === 1) {
            this.visible = true;
        }
    }
    onCollision(dmg, _type) {
        this.visible = true;
        CaveWorld.grownPlant[CaveWorld.index] = 1;
    }
}