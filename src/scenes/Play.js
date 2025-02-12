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
        this.playerCar = new Player(this, 342, 700, 'player').setScale(0.5)

        //add enemy cars
        this.enemyCar01 = new Enemy(this, 240, -50, 'enemy', 'left').setScale(0.5).setOrigin(0.5, 0)
        this.enemyCar02 = new Enemy(this, 362, -50, 'enemy-blue', 'right').setScale(0.5).setOrigin(0.5, 0)

        //add jay walker
        this.walker01 = new Walker(this, 390, -50, 'jay-walker', 10).setScale(0.017).setOrigin(0, 0.5)

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //player-enemy collision
        this.physics.add.collider(this.playerCar, this.enemyCar01, (player, enemy) => {
            this.add.sprite(player.x, player.y - 75, 'explosion').setScale(0.3)
            this.gameOver = true
            
            //restart button
            let restartButton = this.add.image(225, 350, 'restart-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                this.scene.restart()
            }).on('pointerover', () => restartButton.setTint(0xaaaaaa)).on('pointerout', () => restartButton.clearTint())
            //menu button
            let menuButton = this.add.image(400, 350, 'menu-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                this.scene.start('menuScene')
            }).on('pointerover', () => menuButton.setTint(0xaaaaaa)).on('pointerout', () => menuButton.clearTint())
        })
        this.physics.add.collider(this.playerCar, this.enemyCar02, (player, enemy) => {
            this.add.sprite(player.x, player.y - 75, 'explosion').setScale(0.3)
            this.gameOver = true
            //game over text
            this.gameOverBG = this.add.graphics()
            this.gameOverBG.fillStyle(0x000000, 0.5)
            this.gameOverBG.fillRect(130, 200, 320, 100)

            this.gameOverText = this.add.text(150, 225, 'GAME OVER', {
                fontSize: '60px',
                color: '#FFFFFF',
                fontFamily: 'Courier',
                align: 'center'
            })

            //restart button
            let restartButton = this.add.image(225, 350, 'restart-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                this.scene.restart()
            }).on('pointerover', () => restartButton.setTint(0xaaaaaa)).on('pointerout', () => restartButton.clearTint())
            //menu button
            let menuButton = this.add.image(400, 350, 'menu-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                this.scene.start('menuScene')
            }).on('pointerover', () => menuButton.setTint(0xaaaaaa)).on('pointerout', () => menuButton.clearTint())
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
        this.scoreBG.fillRect(20, 20, 200, 50)

        this.scoreboard = this.add.text(30, 30, 'Score: ' + this.score, {
            fontSize: '27px',
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
            this.enemyCar01.body.setVelocityX(0)
            this.enemyCar02.body.setVelocityY(0)
            this.enemyCar02.body.setVelocityX(0)
            this.playerCar.body.setVelocityY(0)
            this.playerCar.body.setVelocityX(0)
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