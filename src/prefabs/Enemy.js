class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    update() {
        this.body.setVelocityY(250)
    }

    reset() {
        let spawnPoint = [230, 340]
        let spawnLane = Phaser.Math.Between(0, 1)

        this.x = spawnPoint[spawnLane]
        this.y = -150
    }
}

//right spawns = 456 and 565