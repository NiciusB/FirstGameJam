import Enemy from './Enemy.js'
class Dagger extends Phaser.Sprite {
  constructor(player, mouseDelta) {
    super(player.game, player.x, player.y, 'dagger')
    this.visible = false
    this.player = player
    this.mouseDelta = mouseDelta
    this.rotation = mouseDelta.angle(new Phaser.Point(0, 0))
    this.game.time.events.add(100, this.kill, this)
    this.scale.set(2)

    // Attributes
    this.attackRange = 115
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.visible = this.alive
    this.x = this.player.x + this.mouseDelta.x * 50
    this.y = this.player.y + this.mouseDelta.y * 50
    this.angle += 180 / (100 / delta)
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