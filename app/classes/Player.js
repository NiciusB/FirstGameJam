class Player extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite)
    this.scale.setTo(10, 10)
    this.customCounter = 0
  }

  update() {
    this.customCounter += this.game.time.elapsedMS
    while (this.customCounter > 300) {
      this.customCounter -= 300
      this.alpha = !this.alpha
    }
  }
}

module.exports = Player