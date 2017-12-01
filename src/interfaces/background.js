import Phaser from 'phaser'
import styles from '../interfaces/styles.js'

export const createBackground = (state) => {
  let width = state.game.width
  let height = state.game.height

  // Background
  // -- Sky Part
  let graphics = state.add.graphics(0, 0)
  graphics.beginFill(0x04a9f4)
  graphics.drawRect(0, 0, width, height / 2)
  graphics.endFill()
  // -- Interface Part
  graphics = state.add.graphics(0, 0)
  graphics.beginFill(0x9e9e9e)
  graphics.drawRect(0, height / 2, width, height)
  graphics.endFill()
  // -- Game Part
  graphics = state.add.graphics(0, 0)
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
  graphics = state.add.graphics(0, 0)
  graphics.beginFill()
  graphics.drawRect(0, 550, width, height)
  graphics.endFill()
  state.transparent = true
  state.setGroup = state.game.add.group()
  state.gameGroup = state.game.add.group()
  state.add.text(120, height - 40, 'Created by Tine Arconn', styles.big)
  state.add.text(60, height - 20, 'Ludum Dare 34 - Growing & Two Buttons Controls', styles.small)
}

export const spawnTiles = (state) => {
  let tile
  for (let xx = 0; xx < 332; xx += 38) {
    for (let yy = 0; yy < 332; yy += 38) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      if (xx <= 38 || yy <= 38 || xx >= 266 || yy >= 266) {
        tile = state.isoPlugin.addIsoSprite(xx, yy, 0, 'grass', 0, state.setGroup)
        tile.anchor.set(0.5, 0.7)
        tile.scale.setTo(1.8, 1.8)
      } else {
        tile = state.isoPlugin.addIsoSprite(xx, yy, 0, 'tile3', 0, state.gameGroup)
        tile.anchor.set(0.5, 0.7)
        tile.scale.setTo(1.8, 1.8)
      }
    }
  }
  tile = state.isoPlugin.addIsoSprite(76, 0, 0, 'stables', 0, state.setGroup)
  tile.anchor.set(0.5, 0.7)
  tile.scale.setTo(1, 1)
  tile = state.isoPlugin.addIsoSprite(180, 0, 0, 'warehouse', 0, state.setGroup)
  tile.anchor.set(0.5, 0.7)
  tile.scale.setTo(1, 1)
  tile = state.isoPlugin.addIsoSprite(0, 114, 0, 'windmill', 0, state.setGroup)
  tile.anchor.set(0.5, 0.7)
  tile.scale.setTo(1, 1)
  tile = state.isoPlugin.addIsoSprite(0, 190, 0, 'well', 0, state.setGroup)
  tile.anchor.set(0.5, 0.7)
  tile.scale.setTo(0.3, 0.3)
}
