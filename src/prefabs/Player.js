class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //set bounds for player
        this.body.setCollideWorldBounds(true)
        this.body.setImmovable(true)
    }

    update() {
        //reset velocities and angles when not moving
        this.body.setVelocityX(0)
        this.body.setVelocityY(0)
        this.angle = 0

        //handle player movement
        let playerVector = new Phaser.Math.Vector2(0, 0)

        if(this.scene.leftKey.isDown) {
            //console.log('left working')
            playerVector.x = -1
            this.angle = -20
        } else if (this.scene.rightKey.isDown) {
            //console.log('right working')
            playerVector.x = 1
            this.angle = 20
        }
        if (this.scene.upKey.isDown) {
            playerVector.y = -1
        } else if (this.scene.downKey.isDown) {
            playerVector.y = 1
        }
        playerVector.normalize()
        this.body.setVelocity(200 * playerVector.x, 200 * playerVector.y)
    }

    reset() {
        this.body.x = 362
        this.body.y = 700
    }
}