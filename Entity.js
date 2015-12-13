Entity = function (theGame, theX, theY, theAsset) {
    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, theGame, theX, theY, theAsset);

    // Init everything
	this.mPlaying = false;
	this.mConcludedPlaying = false;
    this.mSpawnPoint = new Phaser.Point(theX, theY);

	// Misc
	this.anchor.setTo(0.5);

	// Physics stuff
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

// Public methods

Entity.prototype.play = function() {
	this.mPlaying = true;
	this.mConcludedPlaying = false;
};

Entity.prototype.rewind = function() {
	this.mPlaying = false;
	this.position.x = this.mSpawnPoint.x;
	this.position.y = this.mSpawnPoint.y;
};

Entity.prototype.concludedPlaying = function() {
	return this.mConcludedPlaying;
};

Entity.prototype.markConcludedPlaying = function() {
	this.mConcludedPlaying = true;
};

Entity.prototype.isPlaying = function() {
	return this.mPlaying;
};
