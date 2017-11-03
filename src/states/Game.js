/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let width = this.game.width
    let height = this.game.height

    this.stage.background = this.add.sprite(0, 0, 'background')
    this.stage.background.scale.setTo(4, 4)
    this.transparent = true

    // Particles effect
    let emitter = this.add.emitter(width / 2, height - 150, 10)
    emitter.makeParticles('seed1')
    emitter.minParticleSpeed.set(-50, -30)
    emitter.maxParticleSpeed.set(50, 30)
    emitter.setAlpha(1, 0.1, 1000, Phaser.Easing.Linear.None)
    emitter.setScale(0.7, 0.1, 0.7, 0.1, 3000, Phaser.Easing.Quintic.Out)
    emitter.gravity = 200

    // this.mushroom = new Mushroom({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
  }

  beginGame () {
    let itTimeToBegin = false
    let score = 0
    let phase = 0

    // Affichage des params du jeu
    if (lifeText) lifeText.destroy()
    lifeText = this.add.text(145, 130, 'Life :', {
      font: '28px Arial',
      fill: '#ffffff'
    });
    life1 = this.add.sprite(220, 110, 'scythe')
    life2 = this.add.sprite(260, 110, 'scythe')
    life3 = this.add.sprite(300, 110, 'scythe')
    life1.scale.setTo(3, 3)
    life2.scale.setTo(3, 3)
    life3.scale.setTo(3, 3)

    if (timerText) timerText.destroy();
    timerText = game.add.text(180, 200, "Timer : 5.0", {
        font: "28px Arial",
        fill: "#ffffff"
    })

    // game.time.events.loop(Phaser.Timer, updateTimer, this);

    if (scoreText) scoreText.destroy();
    scoreText = game.add.text(180, 250, "Score : 0", {
        font: "28px Arial",
        fill: "#ffffff"
    })

    addNewSeed()
  }

  addNewSeed () {
    // On récupère aléatoirement une graine selon la phase
    var seedToFind = Math.random()

    // Calcul de probabilité selon la phase
    var probabilities

    if (phase < 5) {
      probabilities = [1, 0, 0, 0, 0, 0]
    } else if (phase < 10) {
      probabilities = [0.75, 0.25, 0, 0, 0, 0]
    } else if (phase < 20) {
      probabilities = [0.6, 0.3, 0.1, 0, 0, 0]
    } else if (phase < 30) {
      probabilities = [0.4, 0.3, 0.2, 0, 0, 0.1]
    } else if (phase < 40) {
      probabilities = [0.3, 0.2, 0.2, 0.2, 0, 0.1]
    } else {
      probabilities = [0.18, 0.18, 0.18, 0.18, 0.18, 0.1]
    }

    var finded = false
    var i = 0
    while (!finded) {
      if (seedToFind < probabilities[i]) {
        finded = true
      } else {
        seedToFind = seedToFind - probabilities[i]
        i++
      }
    }

    seedParam = {
      life: 1,
      grown: 0,
      bomb: false
    }

    var seedToAdd
    switch (i) {
      case 0:
        seedParam.life = 1
        seedToAdd = 'seed1'
        break
      case 1:
        seedParam.life = 2
        seedToAdd = 'seed2'
        break
      case 2:
        seedParam.life = 3
        seedToAdd = 'seed3'
        break
      case 3:
        seedParam.life = 4
        seedToAdd = 'seed4'
        break
      case 4:
        seedParam.life = 5
        seedToAdd = 'seed5'
        break
      case 5:
        seedParam.life = 0
        bomb: true
        seedToAdd = 'howitzer'
        break
    }

    seed = this.add.sprite(width / 2 - 10, height - 150, seedToAdd)
    emitter.makeParticles(seedToAdd)
    seed.scale.setTo(2, 2)
  }

  grown () {
    if (seedParam.bomb) losingLife(3)
    if (seedParam.grown >= seedParam.life) {
      losingLife(1)
    } else {
      seedParam.grown++
    }
  }

  next () {
    if (seedParam.grown === seedParam.life) {
      scoring()
      phase++

      emitter.start(true, 1000, null, 50)
      seed.destroy()
      addNewSeed()
    } else {
      losingLife(1)
    }
  }

  losingLife (lose) {
    if (lose === 3) {
      life3.destroy()
      life2.destroy()
      gameOver()
    } else {
      if (life3.visible) {
        life3.destroy()
      } else if (life2.visible) {
        life2.destroy()
      } else {
        gameOver()
      }
    }
  }

  scoring () {
    switch (seedParam.life) {
      case 1:
        score += 100
        break
      case 2:
        score += 200
        break
      case 3:
        score += 500
        break
      case 4:
        score += 1000
        break
      case 5:
        score += 2000
        break
    }
    scoreText.setText('Score : ' + score)
  }

  gameOver () {
    lifeText.setText('GAME OVER')
    life1.destroy()
    seed.destroy()
    timerText.setText('Press G or N to restart')
    itTimeToBegin = true
  }

// updateTimer () {
//     counter++;
//     text.setText(counter);
// }
}
