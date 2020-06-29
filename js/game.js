//create new gameScene
let gameScene = new Phaser.Scene('Game');

//initiate scene parameters
gameScene.init = function() {
    //player speed
    this.playerSpeed = 3;

    //enemy speed
    this.enemyMinSpeed = 1;
    this.enemyMaxSpeed = 3;

    //enemy boundaries
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
};

//load assets
gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};

//called once after teh preload ends
gameScene.create = function() {
    //create background
    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);

    //create player
    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(0.5);

    //create treasure
    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
    this.goal.setScale(0.5);

    //create enemy group
    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 4,
        setXY: {
            x: 90,
            y: 100,
            stepX: 100,
            stepY: 20
        }
    });

    // setting scale to all group elements
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        //flipX
        enemy.flipX = true;
        //set speed
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
    }, this);
};
//this is called up to 60 times per second
gameScene.update = function() {
    //touch input
    if (this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    //overlap check with treasure
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        this.scene.restart();
        return;
    }
    //get enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
        //enemy movement
        enemies[i].y += enemies[i].speed;

        let up = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let down = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        if (up || down) {
            enemies[i].speed *= -1;
        }

        // check enemy overlap
        let enemyRect = enemies[i].getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            console.log('Game over!');
            // restart the Scene
            this.scene.restart();
            return;
        }
    }
};

//set configuration of game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};
//create new game
let game = new Phaser.Game(config);