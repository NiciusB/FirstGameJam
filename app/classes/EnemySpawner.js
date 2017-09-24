import Skeleton from './Skeleton.js'
import Golem from './Golem.js'

class EnemySpawner extends Phaser.Group {
  constructor(game) {
    super(game, null, 'enemies')
    this.game = game
    for (var n = 0; n < 15 + this.game.floor * 2; n++) {
      var randomPos = new Phaser.Point(400 + Math.random() * (this.game.world.width - 460), 60 + Math.random() * (this.game.world.height - 60 * 2))
      if (this.checkCloseObjects(randomPos, 150)) {
        if(Math.random() < 0.1 ) {
          this.add(new Golem(this, randomPos.x, randomPos.y))
        } else {
          this.add(new Skeleton(this, randomPos.x, randomPos.y))
        }
      } else n--
    }
  }

  update() {
    super.update()
    /*
    while (this.children.length < 5) {
      var randomPos = new Phaser.Point(60 + Math.random() * (this.game.world.width - 60 * 2), 60 + Math.random() * (this.game.world.height - 60 * 2))
      if (this.checkCloseObjects(randomPos, 200)) {
        this.add(new Skeleton(this, randomPos.x, randomPos.y))
      }
    }
    */
  }

  checkCloseObjects(point, maxDistance) {
    var result = true
    this.children.forEach(val => {
      if (Phaser.Math.distance(val.x, val.y, point.x, point.y) <= maxDistance) {
        result = false
      }
    })
    return result && Phaser.Math.distance(this.game.player.x, this.game.player.y, point.x, point.y) > maxDistance
  }
}
module.exports = EnemySpawner