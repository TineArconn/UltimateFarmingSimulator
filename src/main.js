
// Taille du jeu
const width = 400;
const height = 600;

var gButton, nButton;
var gButtonSprite, nButtonSprite, mainTitle, textGrown, textNext, textCreated, textLudum;
var scoring, lifeText, life1, life2, life3, timerText, timer, seed;

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
    
    game.load.audio('soundG',['sounds/gButton.MP3']);
    game.load.audio('soundN',['sounds/nButton.MP3']);
    
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

    if (gButton.isDown) {
        game.soundG.play();
        beginGame();
    }

    if (nButton.isDown) {
        game.soundN.play();
        beginGame();
    }

}

function beginGame(){
    
    // Suppression de l'affichage du menu
    gButtonSprite.destroy();
    nButtonSprite.destroy();
    mainTitle.destroy();
    textCreated.destroy();
    textGrown.destroy();
    textLudum.destroy();
    textNext.destroy();
    
    // Affichage des params du jeu
    lifeText = game.add.text(150, 120, "Life :", {
        font: "28px Arial",
        fill: "#ffffff"
    });
    life1 = game.add.sprite(220, 100, 'scythe');
    life2 = game.add.sprite(260, 100, 'scythe');
    life3 = game.add.sprite(300, 100, 'scythe');
    life1.scale.setTo(3, 3);
    life2.scale.setTo(3, 3);
    life3.scale.setTo(3, 3);

    timerText = game.add.text(180, 220, "Timer : 5.0", {
        font: "28px Arial",
        fill: "#ffffff"
    });

    //game.time.events.loop(Phaser.Timer, updateTimer, this);
    
    scoring = game.add.text(width / 2, height - 20, "0", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    
}

// function updateTimer() {

//     counter++;
//     text.setText(counter);

// }