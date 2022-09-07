import Phaser from "phaser"
export default class findeljuego extends Phaser.Scene {

    constructor() {
        super({ key: 'Gameover' })
    }
    preload() {
        this.load.video('videogameover', 'GameOver.mp4', 'loadeddata', false, true);
    }
    create() {
        const video = this.add.video(600, 300, 'videogameover')
        this.input.keyboard.once('keydown-SPACE', () => {
            video.play()
            video.setMute(false)
            this.time.delayedCall(4000, () => {
                //this.scene.start('Mapa')
                window.location.reload()
            })
        })

    }
}