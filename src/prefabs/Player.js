class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
    }

    update() {
        //handle player movement
        this.body.setVelocityX(0)
        this.angle = 180
        if(this.scene.leftKey.isDown) {
            //console.log('left working')
            this.body.setVelocityX(-200)
            this.angle = 160
        } else if (this.scene.rightKey.isDown) {
            //console.log('right working')
            this.body.setVelocityX(200)
            this.angle = 200
        }
    }
}