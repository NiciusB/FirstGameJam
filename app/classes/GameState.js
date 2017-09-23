class GameState extends Phaser.State {
  constructor() {
    super()
  }
  preload() {
    this.load.image('stage01', 'assets/images/stage/01.png')
    this.load.spritesheet('playerSprite', 'assets/images/playerSprite.png', 17, 28)
  }
  create() {
    this.game.add.sprite(0, 0, 'stage01')
    this.game.world.setBounds(0, 0, 1920, 1920)

    const Player = require('./Player.js')
    var player = this.add.existing(new Player(this.game, 100, 100))
    this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN)
  }
}

module.exports = GameState