import Alive from './Alive.js'
class Enemy extends Alive {
  constructor(spawner, x, y, sprite) {
    super(spawner.game, x, y, sprite)
    this.spawner = spawner
    this.game.physics.p2.enable(this)
    this.body.fixedRotation = true

    this.hpBar = this.addChild(this.game.add.text(0, - this.height / 2, 'hp'))
    this.hpBar.anchor.setTo(0.5, 0.65)

    // Attributes
    this.body.mass = 10
    this.speed = 0
    this.meleeAttackRange = false
    this.meleeAttackPower = false
    this.meleeTTA = false // Time To Attack

    // Internal vars
    this.msInAttackRange = 0
    this.objectiveMs = 0
    this.objective = new Phaser.Point(0, 0)
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.hpBar.text = Math.ceil(this.health)
    this.objectiveMs -= delta
    if (this.objectiveMs < 0) {
      this.objectiveMs = 250 + Math.random() * 650
      this.objective.set(this.game.player.x, this.game.player.y)
    }

    if (this.body.velocity.x !== 0) {
      this.scale.x = this.body.velocity.x > 0 ? 1 : -1
    }
    if (this.inCamera) {
      // meleeAttack
      if (this.meleeAttackRange && this.meleeAttackPower && this.meleeTTA && Phaser.Math.distance(this.game.player.x, this.game.player.y / 1.5, this.x, this.y / 1.5) <= this.meleeAttackRange) {
        this.play('meleeAttack')
        this.msInAttackRange += delta
        while (this.msInAttackRange > this.meleeTTA) {
          this.msInAttackRange -= this.meleeTTA
          this.game.player.damage(this.meleeAttackPower)
        }
      }
      // Pathfinding
      if (['walking', 'standing'].indexOf(this.animations.currentAnim.name) != -1) {
        this.msInAttackRange = 0
        const closeEnough = 7 // in pixels
        if (Math.round(this.x / closeEnough) != Math.round(this.objective.x / closeEnough)) {
          if (this.x > this.objective.x) {
            this.body.moveLeft(this.speed)
            this.scale.x = -1
            this.children.forEach(val => {
              val.scale.x = -1
            })
            this.play('walking')
          } else {
            this.body.moveRight(this.speed)
            this.scale.x = 1
            this.children.forEach(val => {
              val.scale.x = 1
            })
            this.play('walking')
          }
        }
        if (Math.round(this.y / closeEnough) != Math.round(this.objective.y / closeEnough)) {
          if (this.y > this.objective.y) {
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

  kill() {
    super.kill()
  }
}

module.exports = Enemy