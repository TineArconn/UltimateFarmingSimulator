// Taille du jeu
const width = 400;
const height = 600;

var gButton, nButton, emitter;
var gButtonSprite, nButtonSprite, mainTitle, textGrown, textNext, textCreated, textLudum;
var scoreText, score;
var lifeText, life1, life2, life3;
var timerText, timer, seed, seedParam, phase;
var itTimeToBegin = true;

// Phaser
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('seed1', 'img/seed1.png');
    game.load.image('seed2', 'img/seed2.png');
    game.load.image('seed3', 'img/seed3.png');
    game.load.image('seed4', 'img/seed4.png');
    game.load.image('seed5', 'img/seed5.png');
    game.load.image('scythe', 'img/scythe.png');
    game.load.image('buttonG', 'img/buttonG.png');
    game.load.image('buttonN', 'img/buttonN.png');
    game.load.image('background', 'img/background.png');
    game.load.image('howitzer', 'img/howitzer.png');

    game.load.audio('soundG', ['sounds/gButton.MP3']);
    game.load.audio('soundN', ['sounds/nButton.MP3']);

}

function create() {

    game.stage.background = game.add.sprite(0, 0, 'background');
    game.stage.background.scale.setTo(4, 4);
    game.transparent = true;

    gButton = game.input.keyboard.addKey(Phaser.Keyboard.G);
    nButton = game.input.keyboard.addKey(Phaser.Keyboard.N);

    mainTitle = game.add.text(width - 200, 120, "Ultimate \nFarming \nSimulator", {
        font: "40px Arial",
        fill: "#ffffff"
    });
    textCreated = game.add.text(120, height - 40, "Created by Tine Arconn", {
        font: "14px Arial",
        fill: "#ffffff"
    });
    textLudum = game.add.text(60, height - 20, "Ludum Dare 34 - Growing & Two Buttons Controls", {
        font: "12px Arial",
        fill: "#ffffff"
    });

    gButtonSprite = game.add.sprite(50, height - 130, 'buttonG');
    textGrown = game.add.text(80, height - 130, "Grown", {
        font: "30px Arial",
        fill: "#ffffff"
    });

    nButtonSprite = game.add.sprite(230, height - 130, 'buttonN');
    textNext = game.add.text(260, height - 130, "Next", {
        font: "30px Arial",
        fill: "#ffffff"
    });

    game.soundG = game.add.audio('soundG');
    game.soundN = game.add.audio('soundN');

    emitter = game.add.emitter(width / 2, height - 150, 10);
    emitter.makeParticles('seed1');
    emitter.minParticleSpeed.set(-50, -30);
    emitter.maxParticleSpeed.set(50, 30);
    emitter.setAlpha(1, 0.1, 1000, Phaser.Easing.Linear.None);
    emitter.setScale(0.7, 0.1, 0.7, 0.1, 3000, Phaser.Easing.Quintic.Out);
    emitter.gravity = 200;

}

function update() {

    if (gButton.isDown && gButton.downDuration(1)) {
        game.soundG.play();

        if (itTimeToBegin) {
            beginGame();
        }
        else {
            grown();
        }
    }

    if (nButton.isDown && nButton.downDuration(1)) {
        game.soundN.play();

        if (itTimeToBegin) {
            beginGame();
        }
        else {
            next();
        }
    }
}

function beginGame() {

    itTimeToBegin = false;
    score = 0;
    phase = 0;

    // Suppression de l'affichage du menu
    gButtonSprite.destroy();
    nButtonSprite.destroy();
    mainTitle.destroy();
    textCreated.destroy();
    textGrown.destroy();
    textLudum.destroy();
    textNext.destroy();

    // Affichage des params du jeu
    if (lifeText) lifeText.destroy();
    lifeText = game.add.text(145, 130, "Life :", {
        font: "28px Arial",
        fill: "#ffffff"
    });
    life1 = game.add.sprite(220, 110, 'scythe');
    life2 = game.add.sprite(260, 110, 'scythe');
    life3 = game.add.sprite(300, 110, 'scythe');
    life1.scale.setTo(3, 3);
    life2.scale.setTo(3, 3);
    life3.scale.setTo(3, 3);

    if (timerText) timerText.destroy();
    timerText = game.add.text(180, 200, "Timer : 5.0", {
        font: "28px Arial",
        fill: "#ffffff"
    });

    //game.time.events.loop(Phaser.Timer, updateTimer, this);

    if (scoreText) scoreText.destroy();
    scoreText = game.add.text(180, 250, "Score : 0", {
        font: "28px Arial",
        fill: "#ffffff"
    });

    addNewSeed();

}

function addNewSeed() {

    //On récupère aléatoirement une graine selon la phase
    var seedToFind = Math.random();

    // Calcul de probabilité selon la phase
    var probabilities;

    if (phase < 5) {
        probabilities = [1, 0, 0, 0, 0, 0];
    }
    else if (phase < 10) {
        probabilities = [0.75, 0.25, 0, 0, 0, 0];
    }
    else if (phase < 20) {
        probabilities = [0.6, 0.3, 0.1, 0, 0, 0];
    }
    else if (phase < 30) {
        probabilities = [0.4, 0.3, 0.2, 0, 0, 0.1];
    }
    else if (phase < 40) {
        probabilities = [0.3, 0.2, 0.2, 0.2, 0, 0.1];
    }
    else {
        probabilities = [0.18, 0.18, 0.18, 0.18, 0.18, 0.1];
    }

    var finded = false;
    var i = 0;
    while (!finded) {
        if (seedToFind < probabilities[i]) {
            finded = true;
        }
        else {
            seedToFind = seedToFind - probabilities[i];
            i++;
        }
    }

    seedParam = {
        life: 1,
        grown: 0,
        bomb: false
    };

    var seedToAdd;
    switch (i) {
        case 0:
            seedParam.life = 1;
            seedToAdd = 'seed1';
            break;
        case 1:
            seedParam.life = 2;
            seedToAdd = 'seed2';
            break;
        case 2:
            seedParam.life = 3;
            seedToAdd = 'seed3';
            break;
        case 3:
            seedParam.life = 4;
            seedToAdd = 'seed4';
            break;
        case 4:
            seedParam.life = 5;
            seedToAdd = 'seed5';
            break;
        case 5:
            seedParam.life = 0;
            bomb: true;
            seedToAdd = 'howitzer';
            break;
    }

    seed = game.add.sprite(width / 2 - 10, height - 150, seedToAdd);
    emitter.makeParticles(seedToAdd);
    seed.scale.setTo(2, 2);
};

function grown() {


    if (seedParam.bomb) losingLife(3);
    if (seedParam.grown >= seedParam.life) {
        losingLife(1);
    }
    else {
        seedParam.grown++;
    }
};

function next() {

    if (seedParam.grown === seedParam.life) {
        scoring();
        phase++;

        emitter.start(true, 1000, null, 50);
        seed.destroy();
        addNewSeed();
    }
    else {
        losingLife(1);
    }
};

function losingLife(lose) {

    if (lose === 3) {
        life3.destroy();
        life2.destroy();
        gameOver();
    }
    else {
        if (life3.visible) {
            life3.destroy();
        }
        else if (life2.visible) {
            life2.destroy();
        }
        else {
            gameOver();
        }
    }
};

function scoring() {
    switch (seedParam.life) {
        case 1:
            score += 100;
            break;
        case 2:
            score += 200;
            break;
        case 3:
            score += 500;
            break;
        case 4:
            score += 1000;
            break;
        case 5:
            score += 2000;
            break;
    }
    scoreText.setText('Score : ' + score);
};

function gameOver() {

    lifeText.setText('GAME OVER');
    life1.destroy();
    seed.destroy();
    timerText.setText('Press G or N to restart');
    itTimeToBegin = true;

};

// function updateTimer() {

//     counter++;
//     text.setText(counter);

// }