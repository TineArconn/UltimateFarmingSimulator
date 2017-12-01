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

    // Game variables
    this.phase = 1
    this.score = 0

    createBackground(this)
    spawnTiles(this)

    // 2 Buttons
    this.nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    this.gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)

    // Sound
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    this.nButton.onDown.add(this.next, this)
    this.gButton.onDown.add(this.grown, this)

    // Interface
    this.lifeText = this.add.text(50, 30, 'Life :', styles.interface)
    this.life1 = this.lifeText.addChild(this.make.sprite(50, -15, 'life'))
    this.life2 = this.life1.addChild(this.make.sprite(70, 0, 'life'))
    this.life3 = this.life2.addChild(this.make.sprite(70, 0, 'life'))

    this.timerText = this.add.text(20, height - 150, 'Timer :', styles.interface)
    this.timer = this.timerText.addChild(this.add.text(50, 30, '5.0', styles.interface))
    this.scoreText = this.add.text(width / 2 + 60, height - 150, 'Score :', styles.interface)
    this.score = this.scoreText.addChild(this.add.text(50, 30, '0', styles.interface))

    this.generateBoard()
  }
  generateBoard () {
    this.gameGroup.destroy()
    this.gameGroup = this.game.add.group()
    this.tilesLife = []
    for (let xx = 76; xx < 230; xx += 38) {
      for (let yy = 76; yy < 230; yy += 38) {
        this.addNewSeed(xx, yy)
      }
    }
    this.onTileNumber = 0
    // this.situateFarmer()
  }
  addNewSeed (xx, yy) {
    // On récupère aléatoirement une graine selon la phase
    let seedToFind = Math.random()
    let probabilities, life, seedToAdd, tile

    // Calcul de probabilité selon la phase
    if (this.phase < 1) {
      probabilities = [1, 0, 0, 0]
    } else if (this.phase < 5) {
      probabilities = [0.75, 0.25, 0, 0]
    } else if (this.phase < 10) {
      probabilities = [0.6, 0.3, 0.1, 0]
    } else if (this.phase < 15) {
      probabilities = [0.5, 0.3, 0.2, 0]
    } else if (this.phase < 20) {
      probabilities = [0.4, 0.2, 0.2, 0.2]
    } else {
      probabilities = [0.3, 0.3, 0.2, 0.2]
    }

    let finded = false
    let i = 0
    while (!finded) {
      if (seedToFind < probabilities[i]) {
        finded = true
      } else {
        seedToFind = seedToFind - probabilities[i]
        i++
      }
    }

    switch (i) {
      case 0:
        life = 1
        seedToAdd = 'tile2'
        break
      case 1:
        life = 2
        seedToAdd = 'tile3'
        break
      case 2:
        life = 3
        seedToAdd = 'tile4'
        break
      case 3:
        life = 4
        seedToAdd = 'tile5'
        break
    }

    tile = this.isoPlugin.addIsoSprite(xx, yy, 0, seedToAdd, 0, this.gameGroup)
    tile.anchor.set(0.5, 0.7)
    tile.scale.setTo(1.8, 1.8)

    this.tilesLife.push(life)
  }
  animeFarmer () {
    // Farmer
    this.farmer = this.add.sprite(width / 3, height / 4, 'idle')
    this.farmer.animations.add('idle', [0, 1, 2, 3])
    this.farmer.animations.play('idle', 10, true)
    this.farmer.scale.set(0.5)

    this.farmer = this.add.sprite(width / 3, height / 3, 'hoe')
    this.farmer.animations.add('hoe', [0, 1, 2, 3, 4, 5, 6])
    this.farmer.animations.play('hoe', 10, true)
    this.farmer.scale.set(0.5)

    this.farmer = this.add.sprite(width / 3, height / 2, 'plant')
    this.farmer.animations.add('plant', [0, 1, 2, 3, 4, 5, 6])
    this.farmer.animations.play('plant', 10, true)
    this.farmer.scale.set(0.5)

    this.farmer = this.add.sprite(width / 3, height - 200, 'can')
    this.farmer.animations.add('can', [0, 1, 2, 3, 4, 5, 6])
    this.farmer.animations.play('can', 10, true)
    this.farmer.scale.set(0.5)
  }
  situateFarmer () {
    console.log(this.gameGroup.getAt(this.onTileNumber)._isoPosition)  
    let x = this.gameGroup.getAt(this.onTileNumber)._isoPosition.x
    let y = this.gameGroup.getAt(this.onTileNumber)._isoPosition.y
    this.farmer = this.gameGroup.getAt(this.onTileNumber).addChild(this.add.sprite(0, 0, 'idle'))
    // Farmer
    //this.farmer = this.add.sprite(x, y, 'idle')
    this.farmer.animations.add('idle', [0, 1, 2, 3])
    this.farmer.animations.play('idle', 10, true)
    this.farmer.scale.set(0.5)
  }
  grown () {
    let seedLife = this.tilesLife[this.onTileNumber]
    if (seedLife === 0) {
      this.losingLife()
    } else {
      let position = this.gameGroup.getAt(this.onTileNumber)._isoPosition

      // Particles effect
      let emitter = this.add.emitter(position.x, position.y, 10)
      emitter.makeParticles('stone')
      emitter.minParticleSpeed.set(-50, -30)
      emitter.maxParticleSpeed.set(50, 30)
      // emitter.anchor.set(0.5, 0.7)
      emitter.setAlpha(1, 0.1, 1000, Phaser.Easing.Linear.None)
      emitter.setScale(0.7, 0.1, 0.7, 0.1, 3000, Phaser.Easing.Quintic.Out)
      emitter.gravity = 200
      emitter.start(true, 1000, null, 50)

      this.tilesLife[this.onTileNumber]--

      this.gameGroup.getAt(this.onTileNumber).destroy()
      let tile = this.isoPlugin.addIsoSprite(position.x, position.y, 0, 'tile' + seedLife, 0)
      tile.anchor.set(0.5, 0.7)
      tile.scale.setTo(1.8, 1.8)
      this.gameGroup.addChildAt(tile, this.onTileNumber)
    }
  }
  next () {
    let seedLife = this.tilesLife[this.onTileNumber]
    if (seedLife === 0) {
      this.onTileNumber++
      // this.phase++
      // this.generateBoard()
    } else {
      this.losingLife(1)
    }
  }
  losingLife () {
    if (this.life3.visible) {
      this.life3.destroy()
    } else if (this.life2.visible) {
      this.life2.destroy()
    } else {
      this.gameOver()
    }
  }
  scoring () {
    switch (this.seedParam.life) {
      case 1:
        this.score += 100
        break
      case 2:
        this.score += 200
        break
      case 3:
        this.score += 500
        break
      case 4:
        this.score += 1000
        break
      case 5:
        this.score += 2000
        break
    }
    this.scoreText.setText('Score : ' + this.score)
  }
  gameOver () {
    this.state.start('GameOver')
  }
// updateTimer () {
//     counter++;
//     text.setText(counter);
// }
}
