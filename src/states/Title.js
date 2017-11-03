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
    const buttonStyle = {
      font: '30px Arial',
      fill: '#ffffff'
    }

    // Title text
    let banner = this.add.text(width - 150, 180, 'Ultimate Farming Simulator')
    banner.font = 'Bangers'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.stroke = '#000000'
    banner.strokeThickness = 6
    banner.fill = '#43d637'
    banner.anchor.setTo(0.5)
    banner.wordWrap = true

    const textCreated = this.add.text(120, height - 40, 'Created by Tine Arconn', {
      font: '14px Arial',
      fill: '#ffffff'
    })
    const textLudum = this.add.text(60, height - 20, 'Ludum Dare 34 - Growing & Two Buttons Controls', {
      font: '12px Arial',
      fill: '#ffffff'
    })

    const gButtonSprite = this.add.sprite(50, height - 130, 'buttonG')
    const textGrown = this.add.text(80, height - 130, 'Grown', buttonStyle)

    const nButtonSprite = this.add.sprite(230, height - 130, 'buttonN')
    const textNext = this.add.text(260, height - 130, 'Next', buttonStyle)

    // 2 Buttons
    let nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    let gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    nButton.onDown.addOnce(this.start, this)
    gButton.onDown.addOnce(this.start, this)
  }

  start () {
    this.state.start('Game')
  }
}
