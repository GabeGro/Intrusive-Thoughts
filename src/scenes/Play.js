class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        //game over flag
        let gameOver = false
        
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)

        //add player character
        this.playerCar = new Player(this, 342, 700, 'player').setScale(0.04).setRotation(Phaser.Math.DegToRad(180))

        //add enemy cars
        this.enemyCar01 = new Enemy(this, 260, -50, 'enemy', 'left').setScale(0.1).setOrigin(0.5, 0)
        this.enemyCar02 = new Enemy(this, 345, -50, 'enemy-blue', 'right').setScale(0.15).setOrigin(0.5, 0)

        //add jay walker
        this.walker01 = new Walker(this, 490, -50, 'jay-walker', 10).setScale(0.015).setOrigin(0, 0.5)

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //player-enemy collision
        this.physics.add.collider(this.playerCar, this.enemyCar01, () => {
            this.scene.start('menuScene')
        })
        this.physics.add.collider(this.playerCar, this.enemyCar02, () => {
            this.scene.start('menuScene')
        })

        //player-walker collision
        this.physics.add.collider(this.playerCar, this.walker01, () => {
            this.walker01.reset()
        })
    }
    
    //640 155

    update() {
        this.highway.tilePositionY -= 2.5

        //update all movements
        this.playerCar.update()
        this.enemyCar01.update()
        this.walker01.update()
        //console.log(`${this.playerCar.x}`)

        //handle enemy respawn
        if (this.enemyCar01.y > 800) {
            this.enemyCar01.reset() 
        } else if (this.enemyCar02.y > 800) {
            this.enemyCar02.reset() 
        }

        //jay walker goes off map
        if (this.walker01.y > 800) {
            this.walker01.reset()
        }
    }
}