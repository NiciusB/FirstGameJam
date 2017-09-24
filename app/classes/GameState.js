var playerHp, fps, weaponInfo;
import Player from './Player.js'
import EnemySpawner from './EnemySpawner.js'
import RoomCreator from './RoomCreator.js'
import Lockr from 'lockr'

class GameState extends Phaser.State {
  constructor() {
    super()
  }

  preload() {
    this.load.image('stage01', 'assets/images/stage/fondo_1.png')
    this.load.image('mesa_1', 'assets/images/stage/mesa_1.png')
    this.load.image('mesa_2', 'assets/images/stage/mesa_2.png')
    this.load.image('alfombra_1', 'assets/images/stage/alfombra_1.png')
    this.load.image('estanteria', 'assets/images/stage/estanteria.png')
    this.load.spritesheet('playerSprite', 'assets/images/playerSprite.png', 85, 150)
    this.load.spritesheet('skeletonSprite', 'assets/images/skeletonSprite.png', 72, 100)
    this.load.image('fire_1', 'assets/images/fire_1.png', 25, 25)
    this.load.image('dagger', 'assets/images/dagger.png')
    // bone 22, 22
  }

  create() {
    this.game.time.advancedTiming = true
    
    const worldWidth = 3840
    const worldHeight = 600
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.defaultRestitution = 0.9
    this.game.world.setBounds(60, 10, worldWidth - 60 * 2, worldHeight - 80)
    
    this.game.RoomCreator = new RoomCreator(this.game)
    this.add.existing(this.game.RoomCreator)

    playerHp = this.game.add.text(10, 10, '', { font: "bold 30px Arial", fill: "#fff" })
    playerHp.fixedToCamera = true
    playerHp.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    fps = this.game.add.text(this.game.width - 10, 10, '', { font: "bold 15px Arial", fill: "#fff" })
    fps.anchor.x = 1
    fps.fixedToCamera = true
    fps.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    weaponInfo = this.game.add.text(this.game.width - 10, 30, '', { font: "bold 15px Arial", fill: "#fff" })
    weaponInfo.anchor.x = 1
    weaponInfo.fixedToCamera = true
    weaponInfo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)

    this.game.player = this.add.existing(new Player(this.game, 100, this.game.world.centerY))
    this.game.camera.follow(this.game.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.bounds.setTo(0, 0, worldWidth, worldHeight)
    this.game.camera.lerp.set(0.2)

    this.game.enemySpawner = new EnemySpawner(this.game)
    this.add.existing(this.game.enemySpawner)
  }

  update() {
    playerHp.text = (Math.round(this.game.player.health * 100) / 100) + ' HP'
    fps.text = this.game.time.fps + ' FPS'
    weaponInfo.text = this.game.player.weapon
  }

  gameOver() {
    this.game.state.start('GameState')
  }
}

module.exports = GameState