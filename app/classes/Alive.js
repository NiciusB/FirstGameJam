class Alive extends Phaser.Sprite {
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
    this.exists = true
    this.visible = true
    this.inputEnabled = false
    if (this.input) {
      this.input.useHandCursor = false
    }
    this.events.destroy()
  }
  update() {
    super.update()
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66

    this.body.setZeroVelocity()

    if (this.body.velocity.x < 0) {
      this.scale.x = -1
    } else {
      this.scale.x = 1
    }
  }
}

module.exports = Alive