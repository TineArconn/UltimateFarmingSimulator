/* globals __DEV__ */
import Phaser from 'phaser'
// import Tile from '../sprites/Tile'
// import Farmer from '../sprites/Farmer'
// import Background from '../sprites/Background'
// import Life from '../sprites/Life'

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    // Game variables
    this.phase = 1
    this.score = 0

    // Background
    this.stage.background = this.add.sprite(0, 0, 'background')
    this.stage.background.scale.setTo(4, 4)
    this.transparent = true

    // Particles effect
    this.emitter = this.add.emitter(this.width / 2, this.height - 150, 10)
    this.emitter.makeParticles('seed1')
    this.emitter.minParticleSpeed.set(-50, -30)
    this.emitter.maxParticleSpeed.set(50, 30)
    this.emitter.setAlpha(1, 0.1, 1000, Phaser.Easing.Linear.None)
    this.emitter.setScale(0.7, 0.1, 0.7, 0.1, 3000, Phaser.Easing.Quintic.Out)
    this.emitter.gravity = 200

    // 2 Buttons
    const buttonStyle = {
      font: '30px Arial',
      fill: '#ffffff'
    }
    this.add.sprite(50, this.height - 130, 'buttonG')
    this.add.text(80, this.height - 130, 'Grown', buttonStyle)
    this.add.sprite(230, this.height - 130, 'buttonN')
    this.add.text(260, this.height - 130, 'Next', buttonStyle)
    this.nButton = this.input.keyboard.addKey(Phaser.Keyboard.N)
    this.gButton = this.input.keyboard.addKey(Phaser.Keyboard.G)

    // Sound
    this.soundG = this.add.audio('soundG')
    this.soundN = this.add.audio('soundN')
    this.nButton.onDown.add(this.next, this)
    this.gButton.onDown.add(this.grown, this)

    // Sprites

    // Interface
    this.life1 = this.add.sprite(220, 110, 'scythe')
    this.life2 = this.add.sprite(260, 110, 'scythe')
    this.life3 = this.add.sprite(300, 110, 'scythe')
    this.life1.scale.setTo(3, 3)
    this.life2.scale.setTo(3, 3)
    this.life3.scale.setTo(3, 3)

    let interfaceStyle = {
      font: '28px Arial',
      fill: '#ffffff'
    }

    this.lifeText = this.add.text(145, 130, 'Life :', interfaceStyle)
    this.timerText = this.add.text(180, 200, 'Timer : 5.0', interfaceStyle)
    this.scoreText = this.add.text(180, 250, 'Score : 0', interfaceStyle)

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
    this.lifeText.setText('GAME OVER')
    this.life1.destroy()
    this.seed.destroy()
    this.timerText.setText('Press G or N to restart')
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
