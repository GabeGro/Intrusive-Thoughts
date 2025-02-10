class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        //game over flag
        let gameOver = false
        
        this.highway = this.add.tileSprite(0, 0, 800, 600, 'highway').setOrigin(0, 0)

        //add player character
        this.playerCar = new Player(this, 456, 500, 'player').setScale(0.04).setRotation(Phaser.Math.DegToRad(180))

        //add enemy cars
        this.enemyCar01 = new Enemy(this, 456, -50, 'enemy').setScale(0.1).setOrigin(0.5, 0)

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //player-enemy collision
        this.physics.add.collider(this.playerCar, this.enemyCar01, () => {
            this.scene.start('menuScene')
        })
    }
    
    update() {
        this.highway.tilePositionY -= 2.5

        //update all movements
        this.playerCar.update()
        this.enemyCar01.update()
        //console.log(`${this.playerCar.x}`)

        //handle enemy respawn
        if (this.enemyCar01.y > 600) {
            this.enemyCar01.reset()
        }
    }
}