/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss'

// Game
window.PIXI = require('phaser-ce/build/custom/pixi')
window.p2 = require('phaser-ce/build/custom/p2')
window.Phaser = require('phaser-ce/build/custom/phaser-split')

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game', null, false, false)

const GameState = require('classes/GameState.js')
game.state.add('GameState', GameState)

game.state.start('GameState')
