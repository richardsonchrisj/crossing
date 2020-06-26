let gameScene = new Phaser.Scene('Game');

gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
};

gameScene.create = function() {
    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);

    console.log(bg);

};

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);