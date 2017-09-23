import Alive from './Alive.js'
class Player extends Alive {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite')
    game.physics.p2.enable(this, true)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(50, 80, 0, 0)

    this.speed = 500

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 5, false)
    this.play('standing')
  }

  update() {
    super.update()
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(this.speed)
      this.play('walking')
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(this.speed)
      this.play('walking')
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(this.speed)
      this.play('walking')
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.body.moveRight(this.speed)
      this.play('walking')
    }
  }
}

module.exports = Player