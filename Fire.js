class Fire extends Phaser.Sprite {
 /* constructor(game, x, y) {
    super(game, x, y, 'fire_1', 1)
    game.physics.p2.enable(this, true)
    this.body.fixedRotation = true

    this.speed = 200

    this.animations.add('fire1', [0], 0, true)
    this.play('fire1')      
    
  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.body.velocity.x *= 12.5 / delta // We must use something smaller than 16
    this.body.velocity.y *= 12.5 / delta
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.body.moveDown(this.speed)
      this.play('fire1')      
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.body.moveUp(this.speed)
      this.play('fire1')      
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.body.moveLeft(this.speed)
      this.play('fire1')
      this.scale.x = -1
      this.body.angle = 180  
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.body.moveRight(this.speed)
      this.play('fire1')
      this.scale.x = 1
      this.body.angle = 0      
    }
  }
}
*/
constructor(game, x, y) {
    super(game, x, y, 'fire_1', 1)
    game.physics.p2.enable(this, true)
    this.body.fixedRotation = true
    this.body.clearShapes()
    this.body.addRectangle(25, 25, 0, 0)

    this.speed = 200

  }

  update() {
    const delta = this.game.time.elapsedMS // Delta for 60fps is 16.66
    this.body.velocity.x *= 12.5 / delta // We must use something smaller than 16
    this.body.velocity.y *= 12.5 / delta
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.body.moveDown(this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.body.moveUp(this.speed)
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.body.moveLeft(this.speed)
      this.scale.x = -1
      this.body.angle = 180
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.body.moveRight(this.speed)
      this.scale.x = 1
      this.body.angle = 0
    }
  }
}

module.exports = Fire