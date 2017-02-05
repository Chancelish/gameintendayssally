/* global World KeyManager MyGame CaveWorld Sally */
class VictoryScreen extends World {
    constructor() {
        super();
        this.text = [];
        MyGame.color = "#000000";
        this.text[0] = "And Sally made it out of the hole.";
        this.text[1] = "";
        this.text[2] = "  Thank you for playing my game!";
    }
    update(_dt) {
        super.update();
        
    }
    render(_g) {
        super.render(_g);
        for (let i = 0; i < this.text.length; i++) {
            _g.text(this.text[i], 128, 64+32*i, "#FFFFFF");
        }
    }
}