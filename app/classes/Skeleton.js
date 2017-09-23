class Skeleton extends Phaser.Sprite {
    constructor(game, x, y) {
      super(game, x, y, 'skeletonSprite', 1)
      game.physics.p2.enable(this, true)
      this.body.fixedRotation = true
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
      const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
      this.body.velocity.x *= 12.5 / delta // We must use something smaller than 16
      this.body.velocity.y *= 12.5 / delta
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
        this.body.moveDown(this.speed)
        this.play('walking')
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
        this.body.moveUp(this.speed)
        this.play('walking')
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
        this.body.moveLeft(this.speed)
        this.play('walking')
        this.scale.x = -1
        this.body.angle = 180
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
        this.body.moveRight(this.speed)
        this.play('walking')
        this.scale.x = 1
        this.body.angle = 0
      }
      
      //ataque de esqueleto
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.ENTER)){
        this.play('attacking')
        this.play('attacking')
      }
    }
  }
  
  module.exports = Skeleton