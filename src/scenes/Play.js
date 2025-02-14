class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        //game over flag
        this.gameOver = false

        //game start flag
        this.gameStart = false

        //game speed
        this.gameSpeed = 1

        //set world bounds
        this.physics.world.setBounds(150, 0, 290, 800)

        //play bg music & engine audio
        this.bgMusic = this.sound.add('bg-music', {
            loop: true,
            volume: 0.3
        })
        this.engineAudio = this.sound.add('engine', {
            loop: true,
            volume: 0.3
        })
        this.bgMusic.play()
        this.engineAudio.play()
        
        this.highway = this.add.tileSprite(0, 0, 600, 800, 'highway').setOrigin(0, 0)

        //add player character
        this.playerCar = new Player(this, 362, 700, 'player').setScale(0.53)
        this.playerCar.body.setSize(120, 200)//.setOffset(25, 25)

        //add tutorial text
        this.tutorialText1 = this.add.bitmapText(300, 250, 'jersey', 'Move With Arrows', 70).setOrigin(0.5, 0.5)
        this.tutorialText2 = this.add.bitmapText(300, 350, 'jersey', 'Hit Hitchhikers For Points', 60).setOrigin(0.5, 0.5)

        this.time.delayedCall(4000, () => {
            this.tutorialText1.destroy()
            this.tutorialText2.destroy()
            
            //add enemy cars
            this.enemyCar01 = new Enemy(this, 240, -150, 'enemy', 'left').setScale(0.53).setOrigin(0.5, 0)
            this.enemyCar01.body.setSize(120, 200)
            this.enemyCar02 = new Enemy(this, 362, -150, 'enemy-blue', 'right').setScale(0.53).setOrigin(0.5, 0)
            this.enemyCar02.body.setSize(120, 200)

            //add jay walker
            this.walker01 = new Walker(this, 410 , -100, 'hitchhiker', 10).setScale(1).setOrigin(0, 0.5)
            this.gameStart = true

            //player-enemy collision
            this.physics.add.collider(this.playerCar, this.enemyCar01, (player, enemy) => {
                this.engineAudio.stop()
                
                //delete sprites
                player.setVisible(false)
                player.reset()
                enemy.setVisible(false)
                enemy.reset()
                //run explosion
                let explosion = this.add.sprite(player.x, player.y - 150, 'explosion').setScale(3)
                explosion.play('explosion')
                this.sound.play('explosion')
                explosion.on('animationcomplete', () => {
                    explosion.destroy()
                })
                this.gameOver = true
                //game over text
                this.gameOverBG = this.add.graphics()
                this.gameOverBG.fillStyle(0x000000, 0.5)
                this.gameOverBG.fillRect(40, 200, 520, 100)

                this.gameOverText = this.add.bitmapText(300, 250, 'jersey', 'GAME OVER', 130).setOrigin(0.5, 0.5)

                //restart button
                let restartButton = this.add.image(225, 350, 'restart-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                    this.bgMusic.stop()
                    this.sound.play('select')
                    this.scene.restart()                 
                }).on('pointerover', () => restartButton.setTint(0xaaaaaa)).on('pointerout', () => restartButton.clearTint())
                //menu button
                let menuButton = this.add.image(400, 350, 'menu-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                    this.bgMusic.stop()
                    this.sound.play('select')
                    this.scene.start('menuScene')
                }).on('pointerover', () => menuButton.setTint(0xaaaaaa)).on('pointerout', () => menuButton.clearTint())
            })
            this.physics.add.collider(this.playerCar, this.enemyCar02, (player, enemy) => {
                this.engineAudio.stop()
                
                //delete sprites
                player.setVisible(false)
                player.reset()
                enemy.setVisible(false)
                enemy.reset()
                //run explosion
                let explosion = this.add.sprite(player.x, player.y - 150, 'explosion').setScale(3)
                explosion.play('explosion')
                this.sound.play('explosion')
                explosion.on('animationcomplete', () => {
                    explosion.destroy()
                })
                this.gameOver = true
                //game over text
                this.gameOverBG = this.add.graphics()
                this.gameOverBG.fillStyle(0x000000, 0.5)
                this.gameOverBG.fillRect(40, 200, 520, 100)

                this.gameOverText = this.add.bitmapText(300, 250, 'jersey', 'GAME OVER', 130).setOrigin(0.5, 0.5)

                //restart button
                let restartButton = this.add.image(225, 350, 'restart-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                    this.bgMusic.stop()
                    this.sound.play('select')
                    this.scene.restart()
                }).on('pointerover', () => restartButton.setTint(0xaaaaaa)).on('pointerout', () => restartButton.clearTint())
                //menu button
                let menuButton = this.add.image(400, 350, 'menu-button').setScale(0.5).setInteractive().on('pointerdown', () => {
                    this.bgMusic.stop()
                    this.sound.play('select')
                    this.scene.start('menuScene')
                }).on('pointerover', () => menuButton.setTint(0xaaaaaa)).on('pointerout', () => menuButton.clearTint())
            })
            //player-walker collision
            this.physics.add.collider(this.playerCar, this.walker01, () => {
                this.walker01.reset()
                this.score += this.walker01.points
                this.sound.play('points', {
                    volume: 0.3
                })
            })
            //scoreboard
            this.score = 0

            this.scoreBG = this.add.graphics()
            this.scoreBG.fillStyle(0x000000, 0.5)
            this.scoreBG.fillRect(20, 20, 175, 50)

            this.scoreboard = this.add.bitmapText(30, 25, 'jersey', 'Score: ' + this.score, 40)
            //distance display
            this.distance = 0

            this.distanceBG = this.add.graphics()
            this.distanceBG.fillStyle(0x000000, 0.5)
            this.distanceBG.fillRect(350, 20, 230, 50)

            this.distanceDisplay = this.add.bitmapText(360, 25, 'jersey', 'Distance: ' + this.distance, 40)
        }, [], this)

        //player input
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //timer for speed
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.gameSpeed += 0.1
            },
            loop: true
        })
    }

    update() {
        //update car and highway movements
        if (!this.gameOver) {
            this.highwayScroll()
            this.playerCar.update()
        }
        
        //update enemy and walker movements
        if(!this.gameOver && this.gameStart) {
            this.walker01.update(this.gameSpeed)
            this.enemyCar01.update(this.gameSpeed)
            this.enemyCar02.update(this.gameSpeed)
            //update distance tracker
            this.distanceDisplay.setText('Distance: ' + this.distance.toFixed(0))
            //update scoreboards
            this.scoreboard.setText('Score: ' + this.score)
        }
        if(this.gameOver ) {
            this.walker01.body.setVelocityY(0)
            this.enemyCar01.body.setVelocityY(0)
            this.enemyCar01.body.setVelocityX(0)
            this.enemyCar02.body.setVelocityY(0)
            this.enemyCar02.body.setVelocityX(0)
            this.playerCar.body.setVelocityY(0)
            this.playerCar.body.setVelocityX(0)
        }
        //handle enemy respawn
        if (this.gameStart) {
            if (this.enemyCar01.y > 800) {
                this.enemyCar01.reset() 
            } else if (this.enemyCar02.y > 800) {
                this.enemyCar02.reset() 
            }
            //walker respawn
            if (this.walker01.y > 800) {
                this.walker01.reset()
            }
        }
        
        //console.log(`${this.playerCar.x}`)
    }

    highwayScroll() {
        this.highway.tilePositionY -= 2.5 * this.gameSpeed
        this.distance += this.gameSpeed/5
    }
}