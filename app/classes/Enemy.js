import Alive from './Alive.js'
class Enemy extends Alive {
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite)
    game.physics.p2.enable(this, true)
    this.body.fixedRotation = true
  }

  update() {
    super.update()
  }
}

module.exports = Enemy