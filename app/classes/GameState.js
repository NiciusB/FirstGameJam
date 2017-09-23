var playerHp;
import Player from './Player.js'
import Skeleton from './Skeleton.js'

class GameState extends Phaser.State {
  constructor() {
    super()
  }

  preload() {
    this.load.image('stage01', 'assets/images/stage/fondo_1.png')
    this.load.image('mesa_1', 'assets/images/stage/mesa_1.png')
    this.load.image('dagger', 'assets/images/dagger.png')
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
    this.game.world.setBounds(60, 60, worldWidth - 60 * 2, worldHeight - 60 * 2)

    this.game.add.sprite(0, 0, 'stage01')

    playerHp = this.game.add.text(10, 10, '', { font: "bold 32px Arial", fill: "#fff" })
    playerHp.fixedToCamera = true
    playerHp.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    var mesa = this.game.add.sprite(300, this.game.world.centerY, 'mesa_1')
    this.game.physics.p2.enable(mesa)
    mesa.body.kinematic = true

    this.game.player = this.add.existing(new Player(this.game, 200, this.game.world.randomY))
    this.game.camera.follow(this.game.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.bounds.setTo(0, 0, worldWidth, worldHeight)


    this.game.enemies = []
    var skeleton = this.add.existing(new Skeleton(this.game, 600, this.game.world.randomY))
  }

  update() {
    playerHp.text = (Math.round(this.game.player.health * 100) / 100) + ' HP'
  }

  gameOver() {
    this.game.state.start('GameState')
  }
}

module.exports = GameState