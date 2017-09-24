class DeathState extends Phaser.State {

  create() {
    this.text = this.add.text(this.game.width / 2, this.game.height / 2, 'You died', { font: "bold 50px Asap", fill: '#fff' })
    this.text.anchor.set(0.5)
    this.game.time.events.add(2000, () => {
      this.game.state.start('InterFloorState')
    }, this)
  }
}

module.exports = DeathState