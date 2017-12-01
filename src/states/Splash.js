import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    // Loading bar
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    // Tiles
    this.load.image('tile1', './assets/images/tiles/grass3.png')
    this.load.image('tile2', './assets/images/tiles/iso-grass2.png')
    this.load.image('tile3', './assets/images/tiles/richsoil-farm.png')
    this.load.image('tile4', './assets/images/tiles/iso-dirt.png')
    this.load.image('tile5', './assets/images/tiles/iso-dirt-border.png')

    // Buttons
    this.load.image('buttonG', './assets/images/keyboard/buttonG.png')
    this.load.image('buttonN', './assets/images/keyboard/buttonN.png')

    // Markers
    this.load.image('life', './assets/images/marker/seed.png')
    this.load.image('stone', './assets/images/marker/Stone3.png')

    // Background
    this.load.image('grass', './assets/images/background/iso-grass.png')
    this.load.image('stables', './assets/images/background/stables.svg')
    this.load.image('warehouse', './assets/images/background/warehouse.svg')
    this.load.image('windmill', './assets/images/background/windmill.svg')
    this.load.image('well', './assets/images/background/wishing_well.svg')

    // Farmer
    this.load.spritesheet('idle', './assets/images/animation/7_Farmer_Idle_strip4.png', 95, 128)
    this.load.spritesheet('hoe', './assets/images/animation/7_Farmer_Hoe_strip13.png', 196, 187)
    this.load.spritesheet('plant', './assets/images/animation/7_Farmer_Plant_strip11.png', 128, 146)
    this.load.spritesheet('can', './assets/images/animation/7_Farmer_wCan_strip18.png', 141, 157)


    // Sound
    this.load.audio('soundG', ['./assets/sound/gButton.MP3'])
    this.load.audio('soundN', ['./assets/sound/nButton.MP3'])
  }

  create () {
    this.state.start('Title')
  }
}
