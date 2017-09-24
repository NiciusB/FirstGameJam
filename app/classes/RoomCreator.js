import Chest from './Chest.js'

class RoomCreator extends Phaser.Group {
  constructor(game) {
    super(game, null, 'decoration')
    this.game = game
    const world = this.game.world

    this.game.add.sprite(0, 0, 'stage01')
    this.floor = this.addChild(this.game.make.group())
    this.game.behindEverything = this.addChild(this.game.make.group())

    for (var n = 0; n < 4; n++) {
      var randomPos = new Phaser.Point(200 + Math.random() * (world.width - 600), 150 + Math.random() * (world.height - 250))
      if (this.checkCloseObjects(randomPos, 300, 'alfombra')) {
        const alfombra = this.floor.create(randomPos.x, randomPos.y, 'alfombra_1')
        alfombra.anchor.set(0.5)
        alfombra.scale.set(1.8)
        alfombra.type = 'alfombra'
      } else n--
    }


    for (var n = 0; n < 4; n++) {
      var randomPos = new Phaser.Point(200 + Math.random() * (world.width - 500), 70)
      if (this.checkCloseObjects(randomPos, 100)) {
        const estanteria = this.create(randomPos.x, randomPos.y, 'estanteria')
        this.game.physics.p2.enable(estanteria)
        estanteria.scale.set(1.4)
        estanteria.body.kinematic = true
      } else n--
    }

    for (var n = 0; n < 8; n++) {
      var randomPos = new Phaser.Point(200 + Math.random() * (world.width - 500), 100 + Math.random() * (world.height - 150))
      if (this.checkCloseObjects(randomPos, 250)) {
        const sprite = Math.random() < 0.5 ? 'mesa_1' : 'mesa_2'

        if (Math.random() < 0.25) {
          const alfombra = this.floor.create(randomPos.x, randomPos.y, 'alfombra_1')
          alfombra.anchor.set(0.5)
          alfombra.scale.set(1.4)
        }

        const mesa = this.create(randomPos.x, randomPos.y, sprite)
        this.game.physics.p2.enable(mesa)
        mesa.body.kinematic = true
      } else n--
    }

    for (var n = 0; n < 4; n++) {
      var randomPos = new Phaser.Point(200 + Math.random() * (world.width - 500), 100 + Math.random() * (world.height - 150))
      if (this.checkCloseObjects(randomPos, 100)) {
        const cofre = this.add(new Chest(this.game, randomPos.x, randomPos.y))
      } else n--
    }
  }

  update() {
    super.update()
  }

  checkCloseObjects(point, maxDistance, type = false) {
    var chkGroup = group => {
      var result = true
      group.forEach(val => {
        if (val.children.length) result = result && chkGroup(val.children)
        if ((!type || type == val.type) && Phaser.Math.distance(val.x, val.y, point.x, point.y) <= maxDistance) {
          result = false
        }
      })
      return result
    }
    return chkGroup(this.children)
  }
}
module.exports = RoomCreator