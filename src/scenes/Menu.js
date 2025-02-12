class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('highway', './assets/highway3.png')
        this.load.image('player', './assets/red-car.png')
        this.load.image('enemy', './assets/blue-car.png')
        this.load.image('enemy-blue', './assets/white-car.png')
        this.load.image('jay-walker', './assets/jay-walker.png')
        this.load.image('explosion', './assets/explosion.png')
        this.load.image('restart-button', './assets/restart-button.png')
        this.load.image('menu-button', './assets/menu-button.png')
    }

    create() {
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(300, 400, 'Intrusive Thoughts', menuConfig)

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