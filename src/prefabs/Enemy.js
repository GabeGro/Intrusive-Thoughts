class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, lane) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.direction = lane

        if(this.direction == 'right') {
            this.body.setVelocityY(100)
        } else if(this.direction == 'left') {
            this.body.setVelocityY(250)
        }
    }

    update() {

    }

    reset() {
        if(this.direction == 'left') {
            let spawnPoint = [260, 160]
            let spawnLane = Phaser.Math.Between(0, 1)
            this.x = spawnPoint[spawnLane]
        } else if (this.direction == 'right') {
            let spawnPoint = [342, 435]
            let spawnLane = Phaser.Math.Between(0, 1)
            this.x = spawnPoint[spawnLane]
        }
        this.y = -150
    }
}

//right spawns = 342 and 435