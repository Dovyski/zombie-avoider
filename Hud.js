Hud = function (theGame) {
    // Call parent's class (Phaser.Group) constructor
    Phaser.Group.call(this, theGame);

    // Init everything
    this.mPlayButton = new Phaser.Button(this.game, this.game.world.width - 80, this.game.world.height - 80, 'button', this.onClickPlay, this, 2, 1, 0);

    this.add(this.mPlayButton);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

// Public methods

Hud.prototype.onClickPlay = function() {
	console.log('sdsd');
};
