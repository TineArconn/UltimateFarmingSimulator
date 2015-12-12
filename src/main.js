// Variables qui nous permettront de savoir quand le jeu démarre ou quand il y a un GAME OVER
var GAME_START = false;
var GAME_OVER = false;

// Taille du jeu (mode portrait d'un nexus 5 sans la barre de navigation)
const width = 1080;
const height = 1775;

// Phaser
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
// On rend le background transparent
game.transparent = true;