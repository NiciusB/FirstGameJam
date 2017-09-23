class GameState extends Phaser.State {
  constructor() {
    super()
  }
  preload() {
    this.load.image('stage01', 'assets/images/stage/fondo_1.png')
    this.load.image('mesa_1', 'assets/images/stage/mesa_1.png')
    this.load.spritesheet('playerSprite', 'assets/images/playerSprite.png', 85, 140)
  }
  create() {
    this.game.world.setBounds(0, 0, 3840, 600)
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.world.defaultContactMaterial.friction = 0.5
    this.game.physics.p2.world.setGlobalStiffness(1e5)

    this.game.add.sprite(0, 0, 'stage01')

    var mesa = this.game.add.sprite(300, this.game.world.centerY, 'mesa_1')
    this.game.physics.p2.enable(mesa, true)
    mesa.body.kinematic = true

    const Player = require('./Player.js')
    var player = this.add.existing(new Player(this.game, 100, 100))
    this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN)
  }
}

module.exports = GameState