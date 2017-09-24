class Gui extends Phaser.Group {
  constructor(game) {
    super(game, null, 'gui')
    this.game = game

    this.playerHp = this.add(new Phaser.Text(game, 10, 10, '', { font: "bold 30px Asap", fill: "#fff" }))
    this.playerHp.fixedToCamera = true
    this.playerHp.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    this.fps = this.add(new Phaser.Text(game, this.game.width - 10, 10, '', { font: "bold 15px Asap", fill: "#fff" }))
    this.fps.anchor.x = 1
    this.fps.fixedToCamera = true
    this.fps.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    this.weaponInfo = this.add(new Phaser.Sprite(game, 10, this.game.height - 10, 'bastonGUI'))
    this.weaponInfo.anchor.y = 1
    this.weaponInfo.fixedToCamera = true

    const names = ['potion1', 'potion2', 'potion3']
    names.forEach((name, index) => {
      var text = this.add(new Phaser.Text(game, 90 + 50 * index, this.game.height - 30, index + 1, { font: "bold 15px Asap", fill: "#fff" }))
      text.anchor.set(0.5)
      text.fixedToCamera = true
      text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
      this[name] = this.add(new Phaser.Sprite(game, 100 + 50 * index, this.game.height - 10, 'potion'))
      this[name].anchor.y = 1
      this[name].fixedToCamera = true
      this[name].animations.add('givehealth', [0], 0, false)
      this[name].animations.add('stealhealth', [2], 0, false)
      this[name].animations.add('givemovespeed', [5], 0, false)
      this[name].animations.add('stealmovespeed', [6], 0, false)
      this[name].visible = false
    })
  }

  update() {
    super.update()
    this.playerHp.text = (Math.round(this.game.player.health * 100) / 100) + ' HP'
    this.fps.text = this.game.time.fps + ' FPS'
    var images = { dagger: 'dagaGUI', staff: 'bastonGUI', book: 'bookGUI' }
    this.weaponInfo.loadTexture(images[this.game.player.weapon], 0)

    if (this.game.player.potions.length) {
      const names = ['potion1', 'potion2', 'potion3']
      names.forEach((name, index) => {
        if (this.game.player.potions[index]) {
          this[name].play(this.game.player.potions[index])
          this[name].visible = true
        } else this[name].visible = false
      })
    }
  }
}
module.exports = Gui