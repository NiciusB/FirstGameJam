class GameState extends Phaser.State {
  constructor() {
    super()
  }
  preload() {
    this.load.image('einstein', 'assets/images/einstein.png')
  }
  create() {
    const Player1 = require('./Player.js')
    var p1 = new Player1(this.game, 0, 0)
    var s = this.add.existing(p1)
    s.rotation = 50
  }
}
module.exports = GameState