import Player from './Player.js'
import EnemySpawner from './EnemySpawner.js'
import RoomCreator from './RoomCreator.js'
import Gui from './Gui.js'
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
    this.load.spritesheet('cofre', 'assets/images/stage/cofre.png', 47, 37)
    this.load.spritesheet('playerSprite', 'assets/images/playerSprite.png', 85, 150)
    this.load.spritesheet('skeletonSprite', 'assets/images/skeletonSprite.png', 72, 100)
    this.load.image('fire_1', 'assets/images/fire_1.png', 25, 25)
    this.load.image('dagger', 'assets/images/dagger.png')
    this.load.image('bastonGUI', 'assets/images/gui/baston.png')
    this.load.image('dagaGUI', 'assets/images/gui/daga.png')
    // bone 22, 22
  }

  create() {
    var currGame = this.loadCurrentGame()

    this.game.time.advancedTiming = true

    const worldWidth = 3840
    const worldHeight = 600
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.defaultRestitution = 0.9
    this.game.world.setBounds(60, 10, worldWidth - 60 * 2, worldHeight - 80)

    this.game.RoomCreator = new RoomCreator(this.game)
    this.add.existing(this.game.RoomCreator)

    this.game.Gui = new Gui(this.game)
    this.add.existing(this.game.Gui)

    this.game.player = this.add.existing(new Player(this.game, 100, this.game.world.centerY))
    if (currGame) {
      this.game.player.health = currGame.health
      this.game.player.weapon = currGame.weapon
    }

    this.game.camera.follow(this.game.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.bounds.setTo(0, 0, worldWidth, worldHeight)
    this.game.camera.lerp.set(0.2)

    this.game.enemySpawner = new EnemySpawner(this.game)
    this.add.existing(this.game.enemySpawner)
  }

  update() {
    super.update()
  }

  gameOver() {
    this.game.state.start('InterFloorState')
  }

  endRoom() {
    Lockr.set('currentGame', {
      health: this.game.player.health,
      weapon: this.game.player.weapon,
      floor: this.game.floor + 1
    })
    this.game.state.start('InterFloorState')
  }

  loadCurrentGame() {
    var currGame = Lockr.get('currentGame', false)
    if (currGame) {
      Lockr.rm('currentGame')
      this.game.floor = currGame.floor
    } else {
      this.game.floor = 1
    }
    return currGame
  }
}

module.exports = GameState