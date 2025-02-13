class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load sprite images
        this.load.image('highway', './assets/highway3.png')
        this.load.image('player', './assets/red-car.png')
        this.load.image('enemy', './assets/blue-car.png')
        this.load.image('enemy-blue', './assets/white-car.png')
        this.load.image('hitchhiker', './assets/hitchhiker.png')
        //this.load.image('explosion', './assets/explosion.png')
        this.load.image('restart-button', './assets/restart-button.png')
        this.load.image('menu-button', './assets/menu-button.png')
        this.load.image('play-button', './assets/play-button.png')
        this.load.bitmapFont('jersey', './assets/Jersey/Jersey.png', './assets/Jersey/Jersey.xml')
        
        //load explosion animation
        this.load.spritesheet('explosion', './Intrusive-Thoughts/assets/explosion.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 12
        })

        //load sfx and musc
        this.load.audio('explosion', './assets/explosion.wav')
        this.load.audio('points', './assets/points.wav')
        this.load.audio('bg-music', './assets/background-music.mp3')
    }

    create() {
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)
        //display menu text
        this.add.bitmapText(300, 275, 'jersey', 'Intrusive\nThoughts', 130).setOrigin(0.5, 0.5)

        //explosion animation
        if(!this.anims.exists('explosion'))
            this.anims.create({
                key: 'explosion', 
                frames: this.anims.generateFrameNumbers('explosion', {
                    start: 0, 
                    end: 12,
                    first: 0 
                }), 
                frameRate: 13
            })

        //menu button
        let restartButton = this.add.image(300, 500, 'play-button').setScale(0.8).setInteractive().on('pointerdown', () => {
            this.scene.start('playScene')
        }).on('pointerover', () => restartButton.setTint(0xaaaaaa)).on('pointerout', () => restartButton.clearTint())

        //add inputs
        //this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        //start game
        /*if(Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('playScene')
        }*/
        
        //update highway
        this.highway.tilePositionY -= 2.5
    }
}