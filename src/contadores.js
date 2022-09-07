import Phaser from "phaser"
import { eventocompartido } from "./eventos"

export class contadores extends Phaser.Scene {

    constructor() {
        super({ key: 'contadores' })
    }
    init() {
        this.puntos = 0;
        this.vida = 4;
    }
    preload() {
        this.load.image('corazon', 'Cora-San.png');
    }

    create() {
        eventocompartido.on('puntos', () => {
            this.puntos += 200
            this.puntaje.text = `puntaje: ${this.puntos}`
        }, this)
        eventocompartido.on('monedas', () => {
            this.puntos += 100
            this.puntaje.text = `puntaje: ${this.puntos}`
        }, this)
        this.puntaje = this.add.text(10, 10, 'puntaje: 0', {
            fontSize: '30px',
        })
        eventocompartido.on('perdida', () => {
            console.log('ayuda')
            this.vida += -1
            this.vidaLabel.text = `x${this.vida}`
        }, this)
        this.vidaLabel = this.add.text(70, 70, 'x4', {
            fontSize: '30px',
        })
        this.add.image(50, 80, 'corazon')
    }
    update(t, dt) {
        this.puntos += 0.03;
        this.puntaje.text = `puntaje: ${Math.floor(this.puntos)}`
    }
}