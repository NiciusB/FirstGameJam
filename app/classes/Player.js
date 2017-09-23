class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite', 1)
    game.physics.p2.enable(this)
    this.body.fixedRotation = true

    this.anchor.set(.5)
    this.speed = 20

    this.animations.add('hi', [0,1], 5, true)
    this.play('hi')
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.body.velocity.x *= 12.5 / delta // We must use something smaller than 16
    this.body.velocity.y *= 12.5 / delta
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(delta * this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(delta * this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(delta * this.speed)
      this.scale.x = -1
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.moveRight(delta * this.speed)
      this.scale.x = 1
    }
  }
}

module.exports = Player