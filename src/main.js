// Variables qui nous permettront de savoir quand le jeu démarre ou quand il y a un GAME OVER
var GAME_START = false;
var GAME_OVER = false;

// Taille du jeu
const width = 400;
const height = 600;

var gButton, nButton, gButtonSprite, nButtonSprite;

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
}

function create() {

    game.stage.background = game.add.sprite(0, 0, 'background');
    game.stage.background.scale.setTo(4, 4);
    game.transparent = true;

    gButton = game.input.keyboard.addKey(Phaser.Keyboard.g);
    nButton = game.input.keyboard.addKey(Phaser.Keyboard.n);

    game.add.text(width - 200, 120, "Ultimate \nFarming \nSimulator", {
        font: "40px Arial",
        fill: "#ffffff"
    });
    game.add.text(120, height - 40, "Created by Tine Arconn", {
        font: "14px Arial",
        fill: "#ffffff"
    });
    game.add.text(60, height - 20, "Ludum Dare 34 - Growing & Two Buttons Controls", {
        font: "12px Arial",
        fill: "#ffffff"
    });

    gButtonSprite = game.add.sprite(50, height - 130, 'buttonG');
    game.add.text(80, height - 130, "Grown", {
        font: "30px Arial",
        fill: "#ffffff"
    });

    nButtonSprite = game.add.sprite(230, height - 130, 'buttonN');
    game.add.text(260, height - 130, "Next", {
        font: "30px Arial",
        fill: "#ffffff"
    });

    //game.events.on

}

function update() {

    if (gButton.isDown) {

    }

    if (nButton.isDown) {

    }

}