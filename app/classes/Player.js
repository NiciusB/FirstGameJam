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

    this.weaponCooldown = 0
    this.weapon = 'dagger'

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
    if (this.weaponCooldown > 0) this.weaponCooldown -= delta
    const mouse = this.game.input.mousePointer
    if (this.weaponCooldown <= 0 && mouse.isDown) {
      switch (this.weapon) {
        case 'dagger':
          this.weaponCooldown = 300
          const mouseDelta = new Phaser.Point(mouse.worldX - this.x, mouse.worldY - this.y).normalize(1)
          this.game.add.existing(new Dagger(this, mouseDelta))
          break
      }
    }

    if (!hasMoved) this.play('standing')
  }
}

module.exports = Player