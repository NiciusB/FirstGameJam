import Lockr from 'lockr'

class GameState extends Phaser.State {
  constructor() {
    super()
  }

  preload() {
  }

  create() {
    this.text = this.add.text(this.game.width / 2, this.game.height / 2, 'N FLOOR', { font: "bold 50px Arial", fill: '#fff' })
    this.text.anchor.set(0.5)
    this.game.time.events.add(1000, () => {
      this.game.state.start('GameState')
    }, this)
    this.loadCurrentGame()
  }

  update() {
    super.update()
  }

  ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100
    if (j == 1 && k != 11) {
      return i + "st"
    }
    if (j == 2 && k != 12) {
      return i + "nd"
    }
    if (j == 3 && k != 13) {
      return i + "rd"
    }
    return i + "th"
  }

  loadCurrentGame() {
    var currGame = Lockr.get('currentGame', false)
    if (currGame) {
      this.text.text = this.ordinal_suffix_of(currGame.floor) + ' FLOOR'
    } else {
      this.text.text = 'FIRST FLOOR'
    }
  }
}

module.exports = GameState