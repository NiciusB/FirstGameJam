class Chest extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'cofre')

    this.animations.add('closed', [0], 0, false)
    this.animations.add('opened', [1], 0, false)
    this.openCooldown = 0

    this.game.physics.p2.enable(this)
    this.body.kinematic = true

    this.hint = this.addChild(this.game.make.text(0, - this.height / 2, 'e', { fill: '#fff' }))
    this.hint.anchor.setTo(0.5, 0.8)

    // Attributes
    this.type = Math.random() < 0.2 ? 'weapon' : 'potion'
    switch (this.type) {
      case 'weapon':
        this.weapon = Math.random() < 0.5 ? 'dagger' : 'staff'
        break
      case 'potion':
        this.potion = Math.random() < 0.8 ? 'heal' : 'damage'
        break
    }
  }
  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    if (this.openCooldown > 0) {
      this.openCooldown -= delta
      this.play('opened')
      this.hint.visible = false
    } else {
      this.play('closed')
      this.hint.visible = this.game.player.position.distance(this.position) < 100
      if (this.hint.visible && this.game.input.keyboard.isDown(Phaser.KeyCode.E)) {
        this.openChest()
      }
    }
  }

  openChest() {
    switch (this.type) {
      case 'weapon':
        this.openCooldown = 500
        var tmp = this.weapon
        this.weapon = this.game.player.weapon
        this.game.player.changeWeapon(tmp)
        break
      case 'potion':
        this.openCooldown = 1e5
        switch (this.potion) {
          case 'heal':
            this.game.player.heal(20)
            break
          case 'damage':
            this.game.player.damage(20)
            break
        }
        break
    }
  }
}
module.exports = Chest