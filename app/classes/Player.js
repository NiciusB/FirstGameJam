import Alive from './Alive.js'
import Dagger from './Dagger.js'
import Staff from './Staff.js'
import Book from './Book.js'
import Potions from './Potions.js'

class Player extends Alive {
  constructor(game, x, y) {
    super(game, x, y, 'playerSprite')
    game.physics.p2.enable(this)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(50, 100, 0, 25)

    this.speed = 300
    this.health = this.maxHealth = 100
    this.potions = [false, false, false]

    this.weaponCooldown = 0
    this.changeWeapon('dagger')
    this.play('standing')
  }
  changeWeapon(weapon) {
    this.weapon = weapon
    if (this.weapon === 'dagger') {
      this.animations.add('standing', [10], 0, false)
      this.animations.add('walking', [11, 10, 12, 10], 5, false)
      this.animations.add('attacking', [10, 9, 8, 9], 10, false)
    } else if (this.weapon === 'staff') {
      this.animations.add('standing', [3], 0, false)
      this.animations.add('walking', [4, 3, 5, 3], 5, false)
      this.animations.add('attacking', [7, 6, 7], 10, false)
    } else if (this.weapon === 'book') {
      this.animations.add('standing', [13], 0, false)
      this.animations.add('walking', [14, 13, 15, 13], 5, false)
      this.animations.add('attacking', [16, 17, 16], 10, false)
    } else alert(weapon)
    this.play(this.animations.currentAnim.name)
  }
  getSpeed() {
    return this.speed / ((this.weaponCooldownSlow) > 0 ? 3 : 1)
  }
  isPlayingAttackAnimation() {
    return this.animations.currentAnim.name === 'attacking' && !this.animations.currentAnim.isFinished
  }
  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16

    if (this.x > this.game.world.width - 50) this.game.state.getCurrentState().endRoom()

    var hasMoved = false
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
      this.body.moveDown(this.getSpeed())
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      this.body.moveUp(this.getSpeed())
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.body.moveLeft(this.getSpeed())
      if (!this.isPlayingAttackAnimation()) this.scale.x = -1
      hasMoved = true
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      if (!this.isPlayingAttackAnimation()) this.scale.x = 1
      this.body.moveRight(this.getSpeed())
      hasMoved = true
    }
    if (this.weaponCooldown > 0) this.weaponCooldown -= delta
    if (this.weaponCooldownSlow > 0) this.weaponCooldownSlow -= delta
    const mouse = this.game.input.mousePointer
    if (this.weaponCooldown <= 0 && mouse.isDown) {
      const mouseDelta = new Phaser.Point(mouse.worldX - this.x, mouse.worldY - this.y).normalize()
      this.scale.x = mouseDelta.x > 0 ? 1 : -1
      var weapon
      switch (this.weapon) {
        case 'dagger':
          weapon = new Dagger(this, mouseDelta)
          break
        case 'staff':
          weapon = new Staff(this, mouseDelta)
          break
        case 'book':
          weapon = new Book(this, mouse)
          break
      }
      this.weaponCooldown = weapon.weaponCooldown
      this.weaponCooldownSlow = weapon.weaponCooldownSlow
      this.game.behindEverything.addChild(weapon)
      this.play('attacking')
    }

    if (!this.isPlayingAttackAnimation()) {
      if (hasMoved) {
        this.play('walking')
      } else {
        this.play('standing')
      }
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.ONE)) {
      Potions(this, this.potions[0])
      this.potions[0] = false
    }
    if (this.game && this.game.input.keyboard.isDown(Phaser.KeyCode.TWO)) { // this.game &&  because if the player dies, it doesnt exist
      Potions(this, this.potions[1])
      this.potions[1] = false
    }
    if (this.game && this.game.input.keyboard.isDown(Phaser.KeyCode.THREE)) {
      Potions(this, this.potions[2])
      this.potions[2] = false
    }
  }
}

module.exports = Player