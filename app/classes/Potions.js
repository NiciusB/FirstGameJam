module.exports = (player, potionname) => {
  if (potionname) {
    switch (potionname) {
      case 'givehealth':
        player.heal(25)
        break
      case 'stealhealth':
        player.damage(10)
        break
      case 'givemovespeed':
        player.speed += 50
        player.game.time.events.add(10000, () => {
          player.speed -= 50
        }, this)
        break
      case 'stealmovespeed':
        player.speed -= 25
        player.game.time.events.add(10000, () => {
          player.speed += 25
        }, this)
        break
    }
  }
}