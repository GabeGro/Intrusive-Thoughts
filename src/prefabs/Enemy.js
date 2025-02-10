class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    update() {
        this.body.setVelocityY(200)
    }

    reset() {
        let spawnPoint = [230, 340, 456, 565]
        let spawnLane = Phaser.Math.Between(0, 3)

        this.x = spawnPoint[spawnLane]
        this.y = -50
    }
}