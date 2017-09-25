class Alive extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    super(game, x, y, sprite, frame)
    this.events.onAnimationComplete.add(() => {
      this.play('standing')
    }, this)
  }
  kill() {
    this.alive = false
    this.body.setZeroVelocity()
    if (this.animations.getAnimation('die')) {
      this.animations.stop()
      this.animations.play('die')
      this.events.onAnimationComplete.addOnce(this.realKill, this)
      if (this.events) {
        this.events.onKilled$dispatch(this)
      }
    } else this.realKill()
    return this
  }

  realKill() {
    if (this == this.game.player) this.game.state.getCurrentState().gameOver()
    this.exists = false
    this.visible = false
    this.inputEnabled = false
    if (this.input) {
      this.input.useHandCursor = false
    }
    this.events.destroy()
    this.destroy()
  }
  update() {
    super.update()
    
    this.body.setZeroVelocity()
    if (this.body.x < 80) this.body.x = 80 // FUCK YOU LEFT WALL
  }
}

module.exports = Alive