class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite', 1)
    game.physics.p2.enable(this, true)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(65, 80, -10, 0)

    this.speed = 200

    this.animations.add('hi', [0,1], 5, true)
    this.play('hi')
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.body.velocity.x *= 12.5 / delta // We must use something smaller than 16
    this.body.velocity.y *= 12.5 / delta
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(this.speed)
      this.scale.x = -1
      this.body.angle = 180
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.moveRight(this.speed)
      this.scale.x = 1
      this.body.angle = 0
    }
  }
}

module.exports = Player