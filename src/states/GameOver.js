/* globals __DEV__ */
import Phaser from 'phaser'
import styles from '../interfaces/styles.js'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let width = this.game.width
    let height = this.game.height

    // Background
    this.stage.background = this.add.sprite(0, 0, 'background')
    this.stage.background.scale.setTo(4, 4)
    this.transparent = true

    // Title text
    this.add.text(width - 220, 100, 'Ultimate Farming Simulator', styles.title)
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
    nButton.onDown.addOnce(this.restart, this)
    gButton.onDown.addOnce(this.restart, this)
  }

    // this.lifeText.setText('GAME OVER')
    // this.life1.destroy()
    // this.seed.destroy()
    // this.timerText.setText('Press G or N to restart')

  restart () {
    this.state.start('Title')
  }
}
