import Alive from './Alive.js'
import Dagger from './Dagger.js'

class Player extends Alive {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite')
    game.physics.p2.enable(this)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(50, 100, 0, 10)

    this.speed = 500
    this.health = this.maxHealth = 100

    this.daggerCooldown = 0

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 5, false)
    this.play('standing')
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66

    var hasMoved = false
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(this.speed)
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(this.speed)
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(this.speed)
      this.scale.x = -1
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.scale.x = 1
      this.body.moveRight(this.speed)
      this.play('walking')
      hasMoved = true
    }
    if (this.daggerCooldown > 0) this.daggerCooldown -= delta
    if (this.daggerCooldown <= 0 && this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      this.daggerCooldown = 500
      this.game.add.existing(new Dagger(this))
    }

    if (!hasMoved) this.play('standing')
  }
}

module.exports = Player