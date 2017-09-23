import Enemy from './Enemy.js'
class Skeleton extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'skeletonSprite')
    this.body.clearShapes()
    this.body.addRectangle(40, 85, -12, 5)

    // Attributes
    this.speed = 100
    this.meleeAttackRange = 70
    this.meleeAttackPower = 15
    this.meleeTTA = 500

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 4, false)
    this.animations.add('meleeAttack', [3, 4], 4, false)
    this.play('standing')
  }

  update() {
    super.update()
  }
}

module.exports = Skeleton