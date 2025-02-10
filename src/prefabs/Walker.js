class Walker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.points = pointValue

        //handle initial velocity
        if (this.body.x > 400) {
            this.body.setVelocityX(100)
        } else if (this.body.x < 400) {
            this.body.setVelocityX(-100)
        }
    }

    update() {
        this.body.setVelocityY(150)
    }

    reset() {
        let spawnSide = [155, 640]
        let spawnPicker = Phaser.Math.Between(0, 1)

        this.body.x = spawnSide[spawnPicker]
        this.body.y = -50

        if (this.body.x < 400) {
            this.body.setVelocityX(100)
        } else if (this.body.x > 400) {
            this.body.setVelocityX(-100)
        }
    }
}