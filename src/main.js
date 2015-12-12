// Taille du jeu
const width = 400;
const height = 600;

var gButton, nButton;
var gButtonSprite, nButtonSprite, mainTitle, textGrown, textNext, textCreated, textLudum;
var scoring, score;
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

}

function update() {

    if (gButton.isDown && gButton.downDuration(50)) {
        game.soundG.play();

        if (itTimeToBegin) {
            beginGame();
        }
        else {
            grown();
        }
    }

    if (nButton.isDown && nButton.downDuration(50)) {
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

    timerText = game.add.text(180, 200, "Timer : 5.0", {
        font: "28px Arial",
        fill: "#ffffff"
    });

    //game.time.events.loop(Phaser.Timer, updateTimer, this);

    scoring = game.add.text(180, 250, "Score : 0", {
        font: "28px Arial",
        fill: "#ffffff"
    });

    addNewSeed();

}

function addNewSeed() {

    //On récupère aléatoirement une graine selon la phase
    seed = game.add.sprite(width / 2 - 10, height - 150, 'seed1');
    seedParam = {
        life: 1,
        grown: 0,
        bomb: false
    };
    seed.scale.setTo(2, 2);
};

function grown() {

    seedParam.grown++;
    if (seedParam.bomb) losingLife(3);
    if (seedParam.grown > seedParam.life) {
        losingLife(1);
    }
};

function next() {

    if (seedParam.grown === seedParam.life) {
        scoring();
        phase++;
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
    switch (seed.life) {
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
    scoring.setText('Score : ' + score);
};

function gameOver() {

    lifeText.setText('GAME OVER');
    life1.destroy();
    timerText.destroy();

};

// function updateTimer() {

//     counter++;
//     text.setText(counter);

// }