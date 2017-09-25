class Dagger extends Phaser.Sprite {
  constructor(player, mouseDelta) {
    super(player.game, player.x, player.y, 'dagger')
    this.visible = false
    this.game.time.events.add(100, this.kill, this)

    // Attributes
    this.attackRange = 100
    this.attackPower = -2 + this.game.floor * 12
    this.weaponCooldown = 500
    this.weaponCooldownSlow = 200
  }

  kill() {
    this.game.enemySpawner.children.forEach(val => {
      if (Phaser.Math.distance(val.x, val.y, this.x, this.y) <= this.attackRange) {
        val.damage(this.attackPower)
      }
    })
    super.kill()
  }
}
module.exports = Dagger