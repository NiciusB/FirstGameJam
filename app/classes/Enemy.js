import Alive from './Alive.js'
class Enemy extends Alive {
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite)
    game.physics.p2.enable(this)
    this.body.fixedRotation = true

    // Attributes
    this.speed = 0
    this.meleeAttackRange = false
    this.meleeAttackPower = false
    // Internal vars
    this.msInAttackRange = 0
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66

    if (this.inCamera) {
      // meleeAttack
      if (this.meleeAttackRange && this.meleeAttackPower && Phaser.Math.distance(this.game.player.x, this.game.player.y / 1.5, this.x, this.y / 1.5) <= this.meleeAttackRange) {
        this.play('meleeAttack')
        this.msInAttackRange += delta
        while (this.msInAttackRange > 500) {
          this.msInAttackRange -= 500
          this.game.player.damage(this.meleeAttackPower)
        }
        if (this.x > this.game.player.x) {
          this.body.moveLeft(this.speed / 25)
        } else {
          this.body.moveRight(this.speed / 25)
        }
        if (this.y > this.game.player.y) {
          this.body.moveUp(this.speed / 25)
        } else {
          this.body.moveDown(this.speed / 25)
        }
      }
      // Pathfinding
      if (this.animations.currentAnim.name != 'meleeAttack') {
        this.msInAttackRange = 0
        const closeEnough = 5 // in pixels
        if (Math.round(this.x / closeEnough) != Math.round(this.game.player.x / closeEnough)) {
          if (this.x > this.game.player.x) {
            this.body.moveLeft(this.speed)
            this.play('walking')
          } else {
            this.body.moveRight(this.speed)
            this.play('walking')
          }
        }
        if (Math.round(this.y / closeEnough) != Math.round(this.game.player.y / closeEnough)) {
          if (this.y > this.game.player.y) {
            this.body.moveUp(this.speed)
            this.play('walking')
          } else {
            this.body.moveDown(this.speed)
            this.play('walking')
          }
        }
      }

    }
  }
}

module.exports = Enemy