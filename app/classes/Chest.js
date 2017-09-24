class Chest extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'cofre')

    // Attributes
    this.attackRange = 100
  }
}
module.exports = Chest