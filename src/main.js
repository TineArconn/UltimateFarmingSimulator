// Variables qui nous permettront de savoir quand le jeu démarre ou quand il y a un GAME OVER
var GAME_START = false;
var GAME_OVER = false;

// Taille du jeu
const width = 400;
const height = 1000;

// Phaser
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
});

// On rend le background transparent
game.transparent = true;

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
    
    //game.stage.background = game.add.sprite(0,0,'background');
    game.stage.background = '#AAA5FF';
    game.stage.background.width = width;
    game.stage.background.height = height;
    
}

function update() {}