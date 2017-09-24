import Enemy from './Enemy.js'
class Golem extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'golemSprite')
    this.body.clearShapes()
    this.body.addRectangle(60, 100, 0, 0)

    // Attributes
    this.body.mass = 50
    this.health = this.maxHealth = 150 + this.game.floor * 25
    this.speed = 85
    this.meleeAttackRange = 90
    this.meleeAttackPower = 20 + this.game.floor * 3
    this.meleeTTA = 1000

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 0, 2, 0], 6, false)
    this.animations.add('meleeAttack', [3, 3, 3, 4], 4, false)
    this.play('standing')
  }

  update() {
    super.update()
  }
}

module.exports = Golem