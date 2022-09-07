import Phaser, { Scenes } from "phaser";
import { contadores } from "./contadores.js";
import findeljuego from "./Gameover";
import { Mapa } from "./Mapa.js";
//import { Mapa2 } from "./Mapa2";

const game = new Phaser.Game({
    width: 1200, height: 700, type: Phaser.AUTO, physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0.5 },
            debug: false
        }
    }
    , scene: [Mapa, contadores, findeljuego]
})

export { game }