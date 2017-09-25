class Staff extends Phaser.Sprite {
  constructor(player, mouseDelta) {
    var initialPos = new Phaser.Point(player.x + 30 * player.scale.x, player.y - 20)
    super(player.game, initialPos.x, initialPos.y, 'fire_1')
    this.player = player
    this.mouseDelta = mouseDelta
    this.initialPos = initialPos
    // Attributes
    this.speed = 100
    this.maxRange = 500
    this.speedGain = 800
    this.attackRange = 125
    this.attackPower = 30 + this.game.floor * 5
    this.weaponCooldown = 600
    this.weaponCooldownSlow = 300
    this.delay = 150
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16
    if (this.delay > 0) this.delay -= delta
    if (this.alive && this.delay <= 0) {
      this.speed += this.speedGain * delta / 1000
      this.x += this.mouseDelta.x * (this.speed * delta / 1000)
      this.y += this.mouseDelta.y * (this.speed * delta / 1000)
      if (
        Phaser.Math.distance(this.initialPos.x, this.initialPos.y, this.x, this.y) > this.maxRange ||
        this.x < this.game.world.bounds.left ||
        this.x > this.game.world.bounds.right ||
        this.y < this.game.world.bounds.top ||
        this.y > this.game.world.bounds.bottom ||
        this.stuffInRange(0.4).length > 0
      ) {
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

    this.enemiesInRange().forEach(enemy => {
      enemy.damage(this.attackPower)
    })
    super.kill()
    super.destroy()
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

  stuffInRange(rangeMultiplier = 1) {
    var stuff = []
    this.game.physics.p2.getBodies().forEach(val => {
      if (val && val.sprite && val.sprite != this.game.player && Phaser.Math.distance(val.sprite.x, val.sprite.y, this.x, this.y) <= this.attackRange * rangeMultiplier) {
        stuff.push(val.sprite)
      }
    })
    return stuff
  }
}
module.exports = Staff