/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// APP HERE
// ================================

window.PIXI = require('phaser-ce/build/custom/pixi')
window.p2 = require('phaser-ce/build/custom/p2')
window.Phaser = require('phaser-ce/build/custom/phaser-split')

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game', { preload: preload, create: create })

function preload() {
    game.load.image('einstein', 'assets/images/einstein.png')

}

function create() {
    var s = game.add.sprite(80, 0, 'einstein')
    s.rotation = 0.14
}
