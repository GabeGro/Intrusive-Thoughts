class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        //game over flag
        this.gameOver = false

        //game speed
        this.gameSpeed = 1

        //set world bounds
        this.physics.world.setBounds(150, 0, 260, 800)
        
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)

        //add player character
        this.playerCar = new Player(this, 342, 700, 'player').setScale(0.045).setRotation(Phaser.Math.DegToRad(180))

        //add enemy cars
        this.enemyCar01 = new Enemy(this, 225, -50, 'enemy', 'left').setScale(0.125).setOrigin(0.5, 0)
        this.enemyCar02 = new Enemy(this, 342, -50, 'enemy-blue', 'right').setScale(0.17).setOrigin(0.5, 0)

        //add jay walker
        this.walker01 = new Walker(this, 390, -50, 'jay-walker', 10).setScale(0.017).setOrigin(0, 0.5)

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //player-enemy collision
        this.physics.add.collider(this.playerCar, this.enemyCar01, (player, enemy) => {
            this.add.sprite(player.x - 20, player.y - 20, 'explosion').setScale(0.3)
            this.gameOver = true
            //player.destroy()
            //enemy.destroy()
            //this.scene.start('menuScene')
        })
        this.physics.add.collider(this.playerCar, this.enemyCar02, () => {
            this.scene.start('menuScene')
        })
        //player-walker collision
        this.physics.add.collider(this.playerCar, this.walker01, () => {
            this.walker01.reset()
            this.score += this.walker01.points
        })
        //timer for speed
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.gameSpeed += 0.1
            },
            loop: true
        })
        //scoreboard
        this.score = 0

        this.scoreBG = this.add.graphics()
        this.scoreBG.fillStyle(0x000000, 0.5)
        this.scoreBG.fillRect(50, 50, 200, 50)

        this.scoreboard = this.add.text(50, 50, 'Score: ' + this.score, {
            fontSize: '20px',
            color: '#FFFFFF',
            fontFamily: 'Courier'
        })
    }

    update() {
        //update all movements
        if(!this.gameOver) {
            this.playerCar.update()
            this.walker01.update(this.gameSpeed)
            this.enemyCar01.update(this.gameSpeed)
            this.enemyCar02.update(this.gameSpeed)
            this.highwayScroll()
        }
        if(this.gameOver) {
            this.walker01.body.setVelocityY(0)
            this.enemyCar01.body.setVelocityY(0)
            this.enemyCar02.body.setVelocityY(0)
        }
        //update scoreboards
        this.scoreboard.setText('Score: ' + this.score)
        //handle enemy respawn
        if (this.enemyCar01.y > 800) {
            this.enemyCar01.reset() 
        } else if (this.enemyCar02.y > 800) {
            this.enemyCar02.reset() 
        }
        //walker respawn
        if (this.walker01.y > 800) {
            this.walker01.reset()
        }
        //console.log(`${this.playerCar.x}`)
    }

    highwayScroll() {
        this.highway.tilePositionY -= 2.5 * this.gameSpeed
    }
}