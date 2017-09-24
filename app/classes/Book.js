class Book extends Phaser.Sprite {
  constructor(player, mouse) {
    super(player.game, mouse.worldX, mouse.worldY, 'lava')
    this.animations.add('pool', [0, 1, 2], 9, false)
    this.animations.add('disappear', [2, 1, 0], 10, false)
    this.play('pool')
    // Attributes
    this.attackRange = 100
    this.attackPower = 5 + this.game.floor * 2.5
    this.weaponCooldown = 1000
    this.weaponCooldownSlow = 500
    this.TTL = 1000

    // Sprite things
    this.anchor.set(0.5)
    this.scale.setTo(this.attackRange / this.width, this.attackRange / this.height)
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    if (this.TTL > 0) {
      this.TTL -= delta
      if (this.TTL < 290) this.play('disappear')
      this.enemiesInRange().forEach(enemy => {
        enemy.damage(this.attackPower / delta)
      })
    }
    else this.destroy()
  }

  enemiesInRange(rangeMultiplier = 1) {
    var enemies = []
    this.game.enemySpawner.children.forEach(val => {
      if (Phaser.Math.distance(val.x, val.y, this.x, this.y) <= this.attackRange * rangeMultiplier) {
        enemies.push(val)
      }
    })
    return enemies
  }
}
module.exports = Book