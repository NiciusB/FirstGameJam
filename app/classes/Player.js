import Alive from './Alive.js'
import Dagger from './Dagger.js'
import Staff from './Staff.js'

class Player extends Alive {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite')
    game.physics.p2.enable(this)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(50, 100, 0, 10)

    this.speed = 300
    this.health = this.maxHealth = 100

    this.weaponCooldown = 0
    this.weapon = 'dagger'

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 5, false)
    this.play('standing')
  }
  getSpeed() {
    return this.speed / ((this.weaponCooldown) > 200 ? 3 : 1)
  }
  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66

    if (this.x > this.game.world.width - 50) this.game.state.getCurrentState().endRoom()

    var hasMoved = false
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(this.getSpeed())
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(this.getSpeed())
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(this.getSpeed())
      this.scale.x = -1
      this.play('walking')
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.scale.x = 1
      this.body.moveRight(this.getSpeed())
      this.play('walking')
      hasMoved = true
    }
    if (this.weaponCooldown > 0) this.weaponCooldown -= delta
    const mouse = this.game.input.mousePointer
    if (this.weaponCooldown <= 0 && mouse.isDown) {
      const mouseDelta = new Phaser.Point(mouse.worldX - this.x, mouse.worldY - this.y).normalize(1)
      var weapon
      switch (this.weapon) {
        case 'dagger':
          weapon = new Dagger(this, mouseDelta)
          break
        case 'staff':
          weapon = new Staff(this, mouseDelta)
          break
      }
      this.weaponCooldown = weapon.weaponCooldown
      this.game.add.existing(weapon)
    }

    if (!hasMoved) this.play('standing')
  }
}

module.exports = Player