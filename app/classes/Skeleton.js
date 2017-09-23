import Enemy from './Enemy.js'
class Skeleton extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'skeletonSprite')
    this.body.clearShapes()
    this.body.addRectangle(60, 80, -5, 0)

    this.speed = 200

    this.animations.add('standing', [0], 0, false)
    this.animations.add('walking', [1, 2], 5, false)
    this.play('standing')

    // animaciones esqueleto atacando
    this.animations.add('attacking', [3, 4], 5, false)
  }

  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.body.moveRight(50)
    //ataque de esqueleto
    if (Math.random() < 0.01) {
      this.play('attacking')
    }
    //ataque de esqueleto
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
      this.play('attacking')
      this.play('attacking')
    }
  }
}

module.exports = Skeleton