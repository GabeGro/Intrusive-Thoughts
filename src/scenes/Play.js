class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        this.highway = this.add.tileSprite(0, 0, 800, 600, 'highway').setOrigin(0, 0)

        //add player character
        this.playerCar = new Player(this, 456, 500, 'player').setScale(0.04).setRotation(Phaser.Math.DegToRad(180))

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    
    update() {
        this.highway.tilePositionY -= 2.5

        this.playerCar.update()
    }
}