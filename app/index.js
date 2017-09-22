/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss'

// Game
window.PIXI = require('phaser-ce/build/custom/pixi')
window.p2 = require('phaser-ce/build/custom/p2')
window.Phaser = require('phaser-ce/build/custom/phaser-split')

<<<<<<< HEAD
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game', { preload, create, update }, false, false)
var s;
var z;
var c = 0;
function preload() {
    game.load.image('einstein', 'assets/images/einstein.png')
    game.load.image('01', 'assets/images/01.png')
    game.load.image('02', 'assets/images/02.png')
}

function create() {
    /*s = game.add.sprite(80, 0, 'einstein')
    s.rotation = 0.33
    z = game.add.sprite(900, 270, 'einstein')
    z.scale.x = -1;
    z.rotation = 0.33
    z.alpha = 0.5*/
    s = game.add.sprite(300, 300, '01')
    s.scale.setTo(10, 10)
    z = game.add.sprite(300, 300, '02')
    z.scale.setTo(10, 10)
    z.alpha = 0
}

function update() {
    c += game.time.elapsedMS
    while (c > 300) {
        c -= 300
        s.alpha = !s.alpha
        z.alpha = !z.alpha
    }
}
=======
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game', null, false, false)

const GameState = require('classes/GameState.js')
game.state.add('GameState', GameState)

game.state.start('GameState')
>>>>>>> 27e2d117e902b228b7df83ac7e4bfde9b5597290
