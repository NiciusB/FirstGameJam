import Enemy from './Enemy.js'

class Dagger extends Phaser.Sprite {
  constructor(player) {
    super(player.game, player.right - 20 * player.scale.x, player.y, 'dagger')
    this.player = player
    this.anchor.set(1)
    this.scale.x = player.scale.x
    this.game.time.events.add(100, this.kill, this)
    
    // Attributes
    this.attackRange = 80
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.angle += this.scale.x * 180 / (100 / delta)
  }
  kill() {
    this.game.enemies.forEach(val => {
      if (Phaser.Math.distance(val.x, val.y, this.x, this.y) <= this.attackRange) {
        val.damage(100)
      }
    })
    super.kill()
  }
}
module.exports = Dagger