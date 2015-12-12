Survivor = function (theGame, theX, theY) {
    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, theGame, theX, theY, 'survivor');

    // Init everything
    this.mPath = []; 				// points this survivor is following
	this.mCurrentPoint = 0;			// current point in the path.
	this.mCounter = 0;
	this.mDrawingPath = false;

	// Misc
	this.anchor.setTo(0.5);

	// Physics stuff
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

	// Mouse input
	this.inputEnabled = true;
    this.events.onInputOver.add(this.onMouseOver, this);
    this.events.onInputOut.add(this.onMouseOut, this);
    this.events.onInputDown.add(this.onMouseDown, this);
    this.events.onInputUp.add(this.onMouseUp, this);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Survivor.prototype = Object.create(Phaser.Sprite.prototype);
Survivor.prototype.constructor = Survivor;

// Public methods

Survivor.prototype.update = function(message) {
	var aPoint;

    Phaser.Sprite.prototype.update.call(this);

	this.mCounter -= this.game.time.elapsedMS;

	if(this.mDrawingPath && this.mCounter <= 0) {
		aPoint = this.getPlayState().getPathPoint();

		if(aPoint) {
			aPoint.reset(this.game.input.x, this.game.input.y);
		}
		this.mCounter = 75;
	}
};

Survivor.prototype.onMouseOver = function() {

};

Survivor.prototype.onMouseOut = function() {

};

Survivor.prototype.onMouseDown = function() {
	this.mDrawingPath = true;
};

Survivor.prototype.onMouseUp = function() {
	this.mDrawingPath = false;
};

Survivor.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
