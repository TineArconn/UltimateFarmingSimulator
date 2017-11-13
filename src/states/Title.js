/* globals __DEV__ */
import Phaser from 'phaser'
import styles from '../interfaces/styles.js'
export default class extends Phaser.State {
  init () {}
  preload () {
    this.isoPlugin = this.game.plugins.add(Phaser.Plugin.Isometric)
    this.game.iso.anchor.setTo(0.5, 0.3)
  }

  create () {
    let width = this.game.width
    let height = this.game.height

    // Background
    this.stage.backgroundColor = '#03a9f4'
    this.stage.background = this.add.sprite(0, 0, 'grass')
    this.stage.background.scale.setTo(4, 4)
    // -- Sky Part
    let graphics = this.add.graphics(0, 0)
    graphics.beginFill(0x10fe00)
    graphics.drawRect(0, 150, width, height * 0.70)
    graphics.endFill()
    // -- Game Part
    graphics = this.add.graphics(0, 0)
    graphics.beginFill(0x04a9f4)
    graphics.drawRect(0, 0, width, 150)
    graphics.endFill()
    // -- Interface Part
    graphics = this.add.graphics(0, 0)
    graphics.beginFill(0x9e9e9e)
    graphics.drawRect(0, height * 0.70, width, height)
    graphics.endFill()
    // -- Credits Part
    graphics = this.add.graphics(0, 0)
    graphics.beginFill()
    graphics.drawRect(0, 550, width, height)
    graphics.endFill()
    this.transparent = true

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
    this.spawnTiles()
  }

  start () {
    this.state.start('Game')
  }

  spawnTiles () {
    let tile
    for (let xx = 0; xx < 180; xx += 38) {
      for (let yy = 0; yy < 180; yy += 38) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
        tile = this.isoPlugin.addIsoSprite(xx, yy, 0, 'tile3', 0, this.gameGroup)
        tile.anchor.set(0.5, 0)
        tile.scale.setTo(1.8, 1.8)
      }
    }
  }

}
