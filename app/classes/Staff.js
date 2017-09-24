class Staff extends Phaser.Sprite {
  constructor(player, mousePos) {
    super(player.game, player.x, player.y, 'fire_1')
    this.player = player
    this.mousePos = mousePos
    // Attributes
    this.trajectoryTime = 350
    this.attackRange = 125

    this.game.time.events.add(this.trajectoryTime, this.kill, this)
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.x += (this.mousePos.x - this.player.x) / (this.trajectoryTime / delta)
    this.y += (this.mousePos.y - this.player.y) / (this.trajectoryTime / delta)
  }

  kill() {

    var explosion = this.game.add.sprite(this.x, this.y, 'fire_1')
    explosion.anchor.set(0.5)
    explosion.scale.setTo(this.attackRange / this.width, this.attackRange / this.height)
    this.game.time.events.add(80, explosion => {
      explosion.kill()
    }, this, explosion)

    this.game.enemySpawner.children.forEach(val => {
      if (Phaser.Math.distance(val.x, val.y, this.x, this.y) <= this.attackRange) {
        val.damage(50)
      }
    })
    super.kill()
  }
}
module.exports = Staff