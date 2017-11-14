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
    // Game variables
    this.phase = 1
    this.score = 0

    createBackground(this)

    // Particles effect
    this.emitter = this.add.emitter(this.width / 2, this.height - 150, 10)
    this.emitter.makeParticles('seed1')
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
    this.life1 = this.add.sprite(100, 30, 'life')
    this.life2 = this.add.sprite(150, 30, 'life')
    this.life3 = this.add.sprite(200, 30, 'life')

    this.lifeText = this.add.text(145, 130, 'Life :', styles.interface)
    this.timerText = this.add.text(180, 200, 'Timer : 5.0', styles.interface)
    this.scoreText = this.add.text(180, 250, 'Score : 0', styles.interface)

    spawnTiles(this)

    // this.mushroom = new Mushroom({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)

    this.addNewSeed()
  }
  gameOver () {
    this.state.start('GameOver')
  }
  losingLife (lose) {
    if (lose === 3) {
      this.life3.destroy()
      this.life2.destroy()
      this.gameOver()
    } else {
      if (this.life3.visible) {
        this.life3.destroy()
      } else if (this.life2.visible) {
        this.life2.destroy()
      } else {
        this.gameOver()
      }
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
      grown: 0,
      bomb: false
    }

    let seedToAdd
    switch (i) {
      case 0:
        this.seedParam.life = 1
        seedToAdd = 'seed1'
        break
      case 1:
        this.seedParam.life = 2
        seedToAdd = 'seed2'
        break
      case 2:
        this.seedParam.life = 3
        seedToAdd = 'seed3'
        break
      case 3:
        this.seedParam.life = 4
        seedToAdd = 'seed4'
        break
      case 4:
        this.seedParam.life = 5
        seedToAdd = 'seed5'
        break
      case 5:
        this.seedParam.life = 0
        this.seedParam.bomb = true
        seedToAdd = 'howitzer'
        break
    }

    this.seed = this.add.sprite(this.width / 2 - 10, this.height - 150, seedToAdd)
    this.emitter.makeParticles(seedToAdd)
    this.seed.scale.setTo(2, 2)
  }
  grown () {
    if (this.seedParam.bomb) this.losingLife(3)
    if (this.seedParam.grown >= this.seedParam.life) {
      this.losingLife(1)
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
