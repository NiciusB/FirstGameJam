class Gui extends Phaser.Group {
  constructor(game) {
    super(game, null, 'gui')
    this.game = game

    this.playerHp = this.add(new Phaser.Text(game, 10, 10, '', { font: "bold 30px Arial", fill: "#fff" }))
    this.playerHp.fixedToCamera = true
    this.playerHp.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    this.fps = this.add(new Phaser.Text(game, this.game.width - 10, 10, '', { font: "bold 15px Arial", fill: "#fff" }))
    this.fps.anchor.x = 1
    this.fps.fixedToCamera = true
    this.fps.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    this.weaponInfo = this.add(new Phaser.Text(game, 10, this.game.height - 10, '', { font: "bold 15px Arial", fill: "#fff" }))
    this.weaponInfo.anchor.y = 1
    this.weaponInfo.fixedToCamera = true
    this.weaponInfo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
  }

  update() {
    super.update()
    this.playerHp.text = (Math.round(this.game.player.health * 100) / 100) + ' HP'
    this.fps.text = this.game.time.fps + ' FPS'
    this.weaponInfo.text = this.game.player.weapon
  }
}
module.exports = Gui