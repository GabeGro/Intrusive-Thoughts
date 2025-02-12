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
        //this.load.image('explosion', './assets/explosion.png')
        this.load.image('restart-button', './assets/restart-button.png')
        this.load.image('menu-button', './assets/menu-button.png')
        this.load.bitmapFont('jersey', './assets/Jersey/Jersey.png', './assets/Jersey/Jersey.xml')
        this.load.spritesheet('explosion', '/assets/explosion.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 12
        })
    }

    create() {
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)
        //display menu text
        this.add.bitmapText(300, 275, 'jersey', 'Intrusive\nThoughts', 130).setOrigin(0.5, 0.5)

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