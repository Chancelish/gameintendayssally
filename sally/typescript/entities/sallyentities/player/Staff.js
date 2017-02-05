/*global Entity GameImage Sally MyGame */
class Staff extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["staff"]);
        this.setType("item");
        this.setHitBox(26, 42);
    }
    collect() {
        Sally.hasStaff = true;
        this.destroy();
    }
    render(_g) {
        super.render(_g);
        _g.text("I wonder what that does? I can use it with [X]", 96, 96, "#000000", "24px Verdana");
    }
}