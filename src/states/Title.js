/* globals __DEV__ */
import Phaser from 'phaser'

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

    // Style
    const titleStyle = {
      font: 'Bangers',
      fontSize: 40,
      fill: '#43d637',
      stroke: '#000000',
      strokeThickness: 6,
      wordWrap: true
    }
    const buttonStyle = {
      font: '30px Arial',
      fill: '#ffffff'
    }
    const bigStyle = {
      font: '14px Arial',
      fill: '#ffffff'
    }
    const smallStyle = {
      font: '12px Arial',
      fill: '#ffffff'
    }

    // Title text
    this.add.text(width - 220, 100, 'Ultimate Farming Simulator', titleStyle)
    this.add.text(120, height - 40, 'Created by Tine Arconn', bigStyle)
    this.add.text(60, height - 20, 'Ludum Dare 34 - Growing & Two Buttons Controls', smallStyle)

    // 2 Buttons
    this.add.sprite(50, height - 130, 'buttonG')
    this.add.text(80, height - 130, 'Grown', buttonStyle)
    this.add.sprite(230, height - 130, 'buttonN')
    this.add.text(260, height - 130, 'Next', buttonStyle)
    let nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    let gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)

    // Sound
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    nButton.onDown.addOnce(this.start, this)
    gButton.onDown.addOnce(this.start, this)
  }

  start () {
    this.state.start('Game')
  }
}
