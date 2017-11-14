/* globals __DEV__ */
import Phaser from 'phaser'
import styles from '../interfaces/styles.js'
import { createBackground, spawnTiles } from '../interfaces/background.js'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.isoPlugin = this.game.plugins.add(Phaser.Plugin.Isometric)
    this.game.iso.anchor.setTo(0.5, 0.3)
  }

  create () {
    let width = this.game.width
    let height = this.game.height

    createBackground(this)

    // Title text
    this.add.text(width / 5, 20, 'Ultimate Farming', styles.title)
    this.add.text(width / 3, 60, 'Simulator', styles.title)
    this.add.text(120, height - 40, 'Created by Tine Arconn', styles.big)
    this.add.text(60, height - 20, 'Ludum Dare 34 - Growing & Two Buttons Controls', styles.small)

    // 2 Buttons
    this.add.sprite(50, height - 130, 'buttonG')
    this.add.text(80, height - 130, 'Grown', styles.button)
    this.add.sprite(230, height - 130, 'buttonN')
    this.add.text(260, height - 130, 'Next', styles.button)
    let nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    let gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)

    // Sound
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    nButton.onDown.addOnce(this.start, this)
    gButton.onDown.addOnce(this.start, this)

    // Tiles
    this.gameGroup = this.game.add.group()
    spawnTiles(this)
  }

  start () {
    this.state.start('Game')
  }
}
