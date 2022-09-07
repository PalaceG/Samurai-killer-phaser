import Phaser from "phaser"
import { eventocompartido } from "./eventos";
//en la terminal "npm start"
export class Mapa extends Phaser.Scene {
    constructor() {
        super({ key: 'Mapa' })
    }
    preload() {
        //Cargar escenario
        this.load.image('fondito', 'Assets/fondito.png');
        this.load.image('Bloques', 'Assets/Bloques.png');
        this.load.image('bala', 'bala.png');
        this.load.tilemapTiledJSON('mapa', 'Mapa.json');

        //Cargar personajes
        this.load.spritesheet('Samurai', 'SamuraiTiles.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Enemy1', 'Enemy.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Enemy2', 'Enemy2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('coin', 'coin.png', { frameWidth: 32, frameHeight: 32 });

        //Sonidos
        this.load.audio('musica', 'OP_Ost.mp3');
        this.load.audio('matar', 'matar.mp3');
        this.load.audio('disparar', 'Espada.mp3');
        this.load.audio('coinAudio', 'moneda.mp3');

    }

    create() {


        this.puntajetotal = 0
        this.vidas = 4


        this.volteado = false;
        this.tocarpiso = false;
        this.cameras.main.setBounds(0, 0, 3840, 1600);
        const borde = this.matter.world.setBounds(0, 0, 3840, 1600);

        this.musica = this.sound.add('musica')
        this.musica.play()
        const mapa1 = this.make.tilemap({ key: 'mapa' })
        const tileset1 = mapa1.addTilesetImage('fondito', 'fondito', 32, 32);
        const tileset2 = mapa1.addTilesetImage('Bloques', 'Bloques', 32, 32);

        mapa1.createLayer('fondito', tileset1)
        const coli = mapa1.createLayer('Bloques', tileset2)
        coli.setCollisionByProperty({ Col: true })

        this.matter.world.convertTilemapLayer(coli);
        this.samuraimove = this.matter.add.sprite(100, 400, 'Samurai')
        this.controls = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.samuraimove);
        this.samuraimove.setOnCollide(data => {
            this.tocarpiso = true

        })
        this.samuraimove.setFixedRotation();
        this.scene.launch('contadores');
        eventocompartido.emit('perdida')
        this.samuraimove.setOnCollideWith(borde.walls.bottom, (colision) => {
            this.vidas--
            this.calcularvidas()
        })

        //Animar monedas
        //animar moneda
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNames('coin', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        //Animar Personaje

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Samurai', {
                start: 5,
                end: 0
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'Samurai', frame: 0 }],
            frameRate: 10,

        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Samurai', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //animar malo
        this.anims.create({
            key: 'Enemy1',
            frames: this.anims.generateFrameNames('Enemy1', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'Enemy2',
            frames: this.anims.generateFrameNames('Enemy2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });


        //enemigos
        const enemigos = [];
        const enemigo1 = this.matter.add.sprite(1000, 100, 'Enemy1').setFixedRotation()
        const enemigo2 = this.matter.add.sprite(1700, 100, 'Enemy1').setFixedRotation()
        const enemigo3 = this.matter.add.sprite(2280, 100, 'Enemy1').setFixedRotation()
        const enemigo4 = this.matter.add.sprite(2530, 100, 'Enemy1').setFixedRotation()
        const enemigo5 = this.matter.add.sprite(380, 100, 'Enemy1').setFixedRotation()
        const enemigo6 = this.matter.add.sprite(1720, 100, 'Enemy1').setFixedRotation()
        const enemigo7 = this.matter.add.sprite(600, 100, 'Enemy1').setFixedRotation()
        const enemigo8 = this.matter.add.sprite(2530, 100, 'Enemy1').setFixedRotation()


        enemigos.push(enemigo1, enemigo2, enemigo3, enemigo4, enemigo5, enemigo6, enemigo7, enemigo8);
        console.log(this.samuraimove)

        enemigos.forEach((Enemy) => {
            Enemy.anims.play('Enemy1', true);
        })

        this.grupoenemigos = this.add.group(enemigos);

        //perder
        this.samuraimove.setOnCollideWith(this.grupoenemigos.children.entries, coli => {
            this.vidas--
            this.calcularvidas()
        });

        const enemigos2 = [];
        const enemigo2_1 = this.matter.add.sprite(1050, 100, 'Enemy2').setFixedRotation()
        const enemigo2_2 = this.matter.add.sprite(1900, 100, 'Enemy2').setFixedRotation()
        const enemigo2_3 = this.matter.add.sprite(2300, 100, 'Enemy2').setFixedRotation()
        const enemigo2_4 = this.matter.add.sprite(2550, 100, 'Enemy2').setFixedRotation()
        const enemigo2_5 = this.matter.add.sprite(300, 100, 'Enemy2').setFixedRotation()
        const enemigo2_6 = this.matter.add.sprite(500, 100, 'Enemy2').setFixedRotation()
        const enemigo2_7 = this.matter.add.sprite(2320, 100, 'Enemy2').setFixedRotation()
        const enemigo2_8 = this.matter.add.sprite(2570, 100, 'Enemy2').setFixedRotation()


        enemigos2.push(enemigo2_1, enemigo2_2, enemigo2_3, enemigo2_4, enemigo2_5, enemigo2_6, enemigo2_7, enemigo2_8);

        enemigos2.forEach((Enemy) => {
            Enemy.anims.play('Enemy2', true);
        })

        this.grupoenemigos2 = this.add.group(enemigos2);

        //perder
        this.samuraimove.setOnCollideWith(this.grupoenemigos2.children.entries, coli => {
            this.vidas--
            this.calcularvidas()
        });

        //Monedas
        const monedas = [];
        const monedas1 = this.matter.add.sprite(358, 100, 'coin').setFixedRotation()
        const monedas2 = this.matter.add.sprite(2196, 100, 'coin').setFixedRotation()
        const monedas3 = this.matter.add.sprite(3325, 100, 'coin').setFixedRotation()
        const monedas4 = this.matter.add.sprite(2344, 500, 'coin').setFixedRotation()
        const monedas5 = this.matter.add.sprite(3301, 500, 'coin').setFixedRotation()
        const monedas6 = this.matter.add.sprite(128, 500, 'coin').setFixedRotation()
        const monedas7 = this.matter.add.sprite(779, 100, 'coin').setFixedRotation()
        const monedas8 = this.matter.add.sprite(1436, 500, 'coin').setFixedRotation()
        const monedas9 = this.matter.add.sprite(2002, 500, 'coin').setFixedRotation()


        monedas.push(monedas1, monedas2, monedas3, monedas4, monedas5, monedas6, monedas7, monedas8, monedas9);

        monedas.forEach(moneda => moneda.anims.play('coin', true));


        this.grupomonedas = this.add.group(monedas)
        this.samuraimove.setOnCollideWith(this.grupomonedas.children.entries, coli => {
            coli.gameObject.destroy()
            eventocompartido.emit('monedas')
            this.sound.play('coinAudio');
        });

        this.acum = 0;
    }

    update(t, dt) {
        this.acum += 0.01
        const acum2 = 0.5 * Math.sin(this.acum)
        this.moverSamuraiMove()
        this.grupoenemigos.children.each(Enemy => {

            Enemy.setVelocityX(acum2)
            if (acum2 < 0) {
                Enemy.flipX = true;
            } else {
                Enemy.flipX = false;
            }
        })
        this.grupoenemigos2.children.each(Enemy2 => {

            Enemy2.setVelocityX(acum2)
            if (acum2 < 0) {
                Enemy2.flipX = true;
            } else {
                Enemy2.flipX = false;
            }
        })

    }
    disparar() {
        let direccion = 35
        let velocidad = 5

        const bala = this.matter.add.sprite(this.samuraimove.x + direccion, this.samuraimove.y, 'bala');
        bala.setVelocityX(velocidad)
        if (this.volteado) {
            direccion = -35
            velocidad = -5

        }

        this.time.delayedCall(100, () => {
            bala.destroy()
        })

        bala.setOnCollideWith(this.grupoenemigos.children.entries, coli => {
            eventocompartido.emit('puntos')
            coli.gameObject.destroy()
            this.sound.play('matar');
        })
        bala.setOnCollideWith(this.grupoenemigos2.children.entries, coli => {
            eventocompartido.emit('puntos')
            coli.gameObject.destroy()
            this.sound.play('matar');
        })
        //musica
        this.sound.play('disparar');
    }

    calcularvidas() {
        eventocompartido.emit('perdida')


        if (this.vidas > 0) {
            this.time.delayedCall(300, () => {
                this.samuraimove.setPosition(100, 400)

            })


        }
        else {
            this.time.delayedCall(500, () => {
                this.scene.start('Gameover');
                this.scene.remove('contadores')
                this.musica.pause()
            })

        }
    }

    moverSamuraiMove() {
        if (this.controls.left.isDown) {
            this.samuraimove.setVelocityX(-3);
            this.samuraimove.anims.play('left', true);
            this.volteado = true;
            this.samuraimove.flipX = true;

        }
        else if (this.controls.right.isDown) {
            this.samuraimove.setVelocityX(3)
            this.samuraimove.anims.play('right', true);
            this.volteado = false
            this.samuraimove.flipX = false;

        }
        else {
            this.samuraimove.setVelocityX(0);

            this.samuraimove.anims.play('turn');
        }

        if (this.controls.up.isDown && this.tocarpiso) {
            this.samuraimove.setVelocityY(-10);
            this.tocarpiso = false;
        }
        const disparar = Phaser.Input.Keyboard.JustDown(this.controls.space);
        if (disparar) {

            this.disparar()

        }


    }
}
