import Skeleton from './Skeleton.js'

class EnemySpawner extends Phaser.Group {
  constructor(game) {
    super(game, null, 'enemies')
    this.game = game
    for (var n = 0; n < 20; n++) {
      this.add(new Skeleton(this, this.game.world.randomX, this.game.world.randomY))
    }
  }

  update() {
    super.update()
    while (this.children.length < 5) {
      this.add(new Skeleton(this, this.game.world.randomX, this.game.world.randomY))
    }
  }
}
module.exports = EnemySpawner