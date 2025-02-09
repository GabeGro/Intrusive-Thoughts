//'use strict'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config