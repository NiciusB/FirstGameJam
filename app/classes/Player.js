class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'einstein')
  }
  update() {
    this.x+=0.5;
  }
}
module.exports = Player