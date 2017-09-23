class Player extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite)
    this.scale.setTo(10, 10)
    this.customCounter = 0
    this.speed = 30
  }

  update() {
    const delta = this.game.time.elapsedMS
    this.customCounter += delta
    while (this.customCounter > 300) {
      this.customCounter -= 300
      this.alpha = !this.alpha
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.y += delta * this.speed / 100
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.y -= delta * this.speed / 100
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.x -= delta * this.speed / 100
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.x += delta * this.speed / 100
    }
  }
}

module.exports = Player