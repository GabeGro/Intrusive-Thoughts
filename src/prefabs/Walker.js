class Walker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.points = pointValue

        this.direction = new Phaser.Math.Vector2(1, 1)
        //handle initial velocity
        /*if (this.body.x > 400) {
            this.body.setVelocityX(50 * this.direction.x)
        } else if (this.body.x < 400) {
            this.body.setVelocityX(-50 * this.direction.x)
        }*/
    }

    update(speed) {
        this.body.setVelocityY(150 * speed)
    }

    reset() {
        let spawnSide = [156, 390]
        let spawnPicker = Phaser.Math.Between(0, 1)

        this.body.x = spawnSide[spawnPicker]
        this.body.y = -50
        this.body.setVelocityX(0)

        /*if (this.body.x < 400) {
            this.body.setVelocityX(50 * this.direction.x)
        } else if (this.body.x > 400) {
            this.body.setVelocityX(-50 * this.direction.x)
        }*/
    }
}