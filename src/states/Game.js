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

    // Particles effect
    this.emitter = this.add.emitter(this.width / 2, this.height - 150, 10)
    this.emitter.makeParticles('stone')
    this.emitter.minParticleSpeed.set(-50, -30)
    this.emitter.maxParticleSpeed.set(50, 30)
    this.emitter.setAlpha(1, 0.1, 1000, Phaser.Easing.Linear.None)
    this.emitter.setScale(0.7, 0.1, 0.7, 0.1, 3000, Phaser.Easing.Quintic.Out)
    this.emitter.gravity = 200

    // 2 Buttons
    this.nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    this.gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)

    // Sound
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    this.nButton.onDown.add(this.next, this)
    this.gButton.onDown.add(this.grown, this)

    // Sprites

    // Interface
    this.lifeText = this.add.text(50, 30, 'Life :', styles.interface)
    this.life1 = this.lifeText.addChild(this.make.sprite(50, -15, 'life'))
    this.life2 = this.life1.addChild(this.make.sprite(70, 0, 'life'))
    this.life3 = this.life2.addChild(this.make.sprite(70, 0, 'life'))

    this.timerText = this.add.text(20, height - 150, 'Timer : 5.0', styles.interface)
    this.scoreText = this.add.text(width / 2 + 60, height - 150, 'Score : 0', styles.interface)

    this.addNewSeed()
  }
  gameOver () {
    this.state.start('GameOver')
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
  addNewSeed () {
    // On récupère aléatoirement une graine selon la phase
    let seedToFind = Math.random()

    // Calcul de probabilité selon la phase
    let probabilities

    if (this.phase < 5) {
      probabilities = [1, 0, 0, 0, 0, 0]
    } else if (this.phase < 10) {
      probabilities = [0.75, 0.25, 0, 0, 0, 0]
    } else if (this.phase < 20) {
      probabilities = [0.6, 0.3, 0.1, 0, 0, 0]
    } else if (this.phase < 30) {
      probabilities = [0.4, 0.3, 0.2, 0, 0, 0.1]
    } else if (this.phase < 40) {
      probabilities = [0.3, 0.2, 0.2, 0.2, 0, 0.1]
    } else {
      probabilities = [0.18, 0.18, 0.18, 0.18, 0.18, 0.1]
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

    this.seedParam = {
      life: 1,
      grown: 0
    }

    let seedToAdd
    switch (i) {
      case 0:
        this.seedParam.life = 1
        seedToAdd = 'tile1'
        break
      case 1:
        this.seedParam.life = 2
        seedToAdd = 'tile2'
        break
      case 2:
        this.seedParam.life = 3
        seedToAdd = 'tile3'
        break
      case 3:
        this.seedParam.life = 4
        seedToAdd = 'tile4'
        break
      case 4:
        this.seedParam.life = 5
        seedToAdd = 'tile5'
        break
    }

    this.seed = this.add.sprite(this.width / 2 - 10, this.height - 150, seedToAdd)
    this.emitter.makeParticles(seedToAdd)
    this.seed.scale.setTo(2, 2)
  }
  grown () {
    if (this.seedParam.grown >= this.seedParam.life) {
      this.losingLife()
    } else {
      this.seedParam.grown++
    }
  }
  next () {
    if (this.seedParam.grown === this.seedParam.life) {
      this.scoring()
      this.phase++

      this.emitter.start(true, 1000, null, 50)
      this.seed.destroy()
      this.addNewSeed()
    } else {
      this.losingLife(1)
    }
  }

// updateTimer () {
//     counter++;
//     text.setText(counter);
// }
}
