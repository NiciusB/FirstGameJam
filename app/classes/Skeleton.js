import Enemy from './Enemy.js'
class Skeleton extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'skeletonSprite')
    this.body.clearShapes()
    this.body.addRectangle(40, 85, -12, 5)

    this.speed = 100
    this.meleeAttackRange = 70
    this.attackPower = 15
    this.msInAttackRange = 0

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 5, false)
    this.animations.add('attacking', [3, 4], 2, false)
    this.play('standing')
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66

    if (this.inCamera) {
      // ataque de esqueleto
      if (Phaser.Math.distance(this.game.player.x, this.game.player.y / 1.5, this.x, this.y / 1.5) <= this.meleeAttackRange) {
        this.play('attacking')
        this.msInAttackRange += delta
        while (this.msInAttackRange > 500) {
          this.msInAttackRange -= 500
          this.game.player.damage(this.attackPower)
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
      } else {
        this.msInAttackRange = 0
        // pathfinding
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

module.exports = Skeleton