class GameState extends Phaser.State {
  constructor() {
    super()
  }
  preload() {
    this.load.image('stage01', 'assets/images/stage/fondo_1.png')
    this.load.image('mesa_1', 'assets/images/stage/mesa_1.png')
    this.load.spritesheet('playerSprite', 'assets/images/playerSprite.png', 83, 141)
    this.load.spritesheet('skeletonSprite', 'assets/images/skeletonSprite.png', 72, 100)
    this.load.image('fire_1', 'assets/images/fire_1.png', 25, 25)
    // bone 22, 22
  }
  create() {
    const worldWidth = 3840
    const worldHeight = 600
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.defaultRestitution = 0.9

    this.game.add.sprite(0, 0, 'stage01')

    var mesa = this.game.add.sprite(300, this.game.world.centerY, 'mesa_1')
    this.game.physics.p2.enable(mesa, true)
    mesa.body.kinematic = true

    const Player = require('./Player.js')
    var player = this.add.existing(new Player(this.game, this.game.world.randomX, this.game.world.randomY))
    this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.bounds.setTo(0, 0, worldWidth, worldHeight)

    const Skeleton = require('./Skeleton.js')
    const Enemy = require('./Enemy.js')
    var skeleton = this.add.existing(new Skeleton(this.game, this.game.world.randomX, this.game.world.randomY))
  }
}

module.exports = GameState