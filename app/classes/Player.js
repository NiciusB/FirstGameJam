class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite', 1)
    this.anchor.set(.5)
    this.scale.set(5)
    this.customCounter = 0
    this.speed = 20
    this.animations.add('hi', [0,1], 5, true)
    this.play('hi')
  }

  update() {
    const delta = this.game.time.elapsedMS
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