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
    // -- Sky Part
    let graphics = this.add.graphics(0, 0)
    graphics.beginFill(0x04a9f4)
    graphics.drawRect(0, 0, width, height / 2)
    graphics.endFill()
    // -- Interface Part
    graphics = this.add.graphics(0, 0)
    graphics.beginFill(0x9e9e9e)
    graphics.drawRect(0, height / 2, width, height)
    graphics.endFill()
    // -- Game Part
    graphics = this.add.graphics(0, 0)
    let poly = new Phaser.Polygon()
    poly.setTo([new Phaser.Point(0, height / 2 - 25),
      new Phaser.Point(0, height / 2 + 60),
      new Phaser.Point(width / 2, height / 2 + 170),
      new Phaser.Point(width, height / 2 + 60),
      new Phaser.Point(width, height / 2 - 25),
      new Phaser.Point(width / 2, height / 2 - 135)
    ])
    graphics.beginFill(0x10fe00)
    graphics.drawPolygon(poly.points)
    graphics.endFill()
    // -- Credits Part
    graphics = this.add.graphics(0, 0)
    graphics.beginFill()
    graphics.drawRect(0, 550, width, height)
    graphics.endFill()
    this.transparent = true
    this.setGroup = this.game.add.group()

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
    for (let xx = 0; xx < 332; xx += 38) {
      for (let yy = 0; yy < 332; yy += 38) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
        console.log(xx, yy)
        if (xx <= 38 || yy <= 38 || xx >= 266 || yy >= 266) {
          tile = this.isoPlugin.addIsoSprite(xx, yy, 0, 'grass', 0, this.setGroup)
          tile.anchor.set(0.5, 0.7)
          tile.scale.setTo(1.8, 1.8)
        } else {
          tile = this.isoPlugin.addIsoSprite(xx, yy, 0, 'tile3', 0, this.gameGroup)
          tile.anchor.set(0.5, 0.7)
          tile.scale.setTo(1.8, 1.8)
        }
      }
    }
    tile = this.isoPlugin.addIsoSprite(76, 0, 0, 'stables', 0, this.setGroup)
    tile.anchor.set(0.5, 0.7)
    tile.scale.setTo(1, 1)
    tile = this.isoPlugin.addIsoSprite(180, 0, 0, 'warehouse', 0, this.setGroup)
    tile.anchor.set(0.5, 0.7)
    tile.scale.setTo(1, 1)
    tile = this.isoPlugin.addIsoSprite(0, 114, 0, 'windmill', 0, this.setGroup)
    tile.anchor.set(0.5, 0.7)
    tile.scale.setTo(1, 1)
    tile = this.isoPlugin.addIsoSprite(0, 190, 0, 'well', 0, this.setGroup)
    tile.anchor.set(0.5, 0.7)
    tile.scale.setTo(0.3, 0.3)
  }

}
