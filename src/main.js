//Name: Gabriel Groenwold
//Game Title: Intrusive Thoughts
//Hours: ~25 hours
//Creative Tilt: I think that I did something technically interesting and visually interesting. Technically, I was able to impliment
//               the buttons used in the UI, which isn't something we've learned in class. Additionally, I made all the art myself 
//               (except for the explosion animation), which was difficult because I've never really tried pixel art before. I'm 
//               especially proud of the scrolling background, which I put a lot of detail into. 
//
//               P.S. I put the credits for the assets in a series of consoles logs in Menu.js

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu , Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config