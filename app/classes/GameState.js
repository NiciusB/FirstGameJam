class GameState extends Phaser.State {
  constructor() {
    super()
  }
  preload() {
    this.load.image('01', 'assets/images/01.png')
    this.load.image('02', 'assets/images/02.png')
  }
  create() {
    const Player = require('./Player.js')
    var player1 = this.add.existing(new Player(this.game, 100, 100, '01'))
    var player2 = this.add.existing(new Player(this.game, 100, 100, '02'))
    player2.alpha = 0
  }
}
module.exports = GameState