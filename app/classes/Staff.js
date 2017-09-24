class Staff extends Phaser.Sprite {
  constructor(player, mousePos) {
    super(player.game, player.x, player.y, 'fire_1')
    this.player = player
    this.mousePos = mousePos
    // Attributes
    this.speed = 100
    this.attackRange = 125
    this.attackPower = 45
    this.delay = 300
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    if (this.delay > 0) this.delay -= delta
    if (this.alive && this.delay <= 0) {
      const dir = new Phaser.Point(this.mousePos.x - this.x, this.mousePos.y - this.y).normalize()
      this.x += dir.x * (this.speed / delta)
      this.y += dir.y * (this.speed / delta)
      if (Phaser.Math.distance(this.x, this.y, this.mousePos.x, this.mousePos.y) <= 10) {
        this.kill()
      }
    }
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
        val.damage(this.attackPower)
      }
    })
    super.kill()
  }
}
module.exports = Staff