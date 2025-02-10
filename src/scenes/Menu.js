class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('highway', './assets/highway.png')
        this.load.image('player', './assets/player-car.png')
        this.load.image('enemy', './assets/enemy-car.png')
        this.load.image('jay-walker', './assets/jay-walker.png')
    }

    create() {
        this.highway = this.add.tileSprite(0, 0, 800, 600, 'highway').setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(game.config.width/2, 400, 'Intrusive Thoughts', {})

        //add inputs
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        //start game
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('playScene')
        }
        
        //update highway
        this.highway.tilePositionY -= 2.5
    }
}