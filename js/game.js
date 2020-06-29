let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.playerSpeed = 1;
}

gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};

gameScene.create = function() {
    this.bg = this.add.sprite(0, 0, 'background');
    this.bg.setOrigin(0, 0);

    this.player = this.add.sprite(50, this.sys.game.config.height / 2, 'player');
    this.player.setScale(0.5);

    this.enemy = this.add.sprite(100, 180, 'enemy');
    this.enemy.setScale(0.5);
    this.enemy.flipX = true;
    console.log(this.player);

    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
    this.goal.setScale(0.5);

};

gameScene.update = function() {
    if (this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        this.scene.restart();
        return;
    };
};

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);