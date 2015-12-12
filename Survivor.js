Survivor = function (theGame, theX, theY) {
    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, theGame, theX, theY, 'survivor');

    // Init everything
    this.mPathPoints = []; 									// points this survivor is following
    this.mSpawnPoint = new Phaser.Point(theX, theY);
	this.mCurrentPoint = 0;								// current point in the path.
	this.mCounter = 0;
	this.mDrawingPath = false;
	this.mPlaying = false;
	this.mConcludedPlaying = false;

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
    Phaser.Sprite.prototype.update.call(this);

	this.mCounter -= this.game.time.elapsedMS;

	if(this.mPlaying) {
		this.updatePlaying();

	} else if(this.mDrawingPath && this.mCounter <= 0) {
		this.drawPath();
		this.mCounter = 75;
	}
};

Survivor.prototype.drawPath = function() {
	var aPoint;

	aPoint = this.getPlayState().getPathPoint();

	if(aPoint) {
		aPoint.reset(this.game.input.x, this.game.input.y);
		this.mPathPoints.push(aPoint);
	}
};

Survivor.prototype.erasePath = function() {
	var i;

	for(i = 0; i < this.mPathPoints.length; i++) {
		this.mPathPoints[i].kill();
	}

	this.mPathPoints.length = 0;
};

Survivor.prototype.play = function() {
	var aPoint;

	this.mPlaying = true;
	this.mConcludedPlaying = false;
	this.mCurrentPoint = 0;

	aPoint = this.mCurrentPoint < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint] : null;

	if(aPoint) {
		this.body.velocity.x = aPoint.x - this.position.x;
		this.body.velocity.y = aPoint.y - this.position.y;
	}
};

Survivor.prototype.rewind = function() {
	this.mPlaying = false;
	this.position.x = mSpawnPoint.x;
	this.position.y = mSpawnPoint.y;
};

Survivor.prototype.updatePlaying = function() {
	var aCurrentPoint,
		aNextPoint;

	aCurrentPoint = this.mCurrentPoint < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint] : null;

	if(aCurrentPoint && this.position.distance(aCurrentPoint) <= 10) {
		aNextPoint = (this.mCurrentPoint + 1) < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint + 1] : null;

		if(aNextPoint) {
			this.body.velocity.x = aNextPoint.x - aCurrentPoint.x;
			this.body.velocity.y = aNextPoint.y - aCurrentPoint.y;

		} else {
			this.mConcludedPlaying = true;
			this.body.velocity.setTo(0, 0);
		}

		this.mCurrentPoint++;
	}

	// Adjust to face the velocity vector
};

Survivor.prototype.onMouseOver = function() {

};

Survivor.prototype.onMouseOut = function() {

};

Survivor.prototype.onMouseDown = function() {
	if(!this.mPlaying) {
		this.mDrawingPath = true;
		this.erasePath();
	}
};

Survivor.prototype.onMouseUp = function() {
	this.mDrawingPath = false;
};

Survivor.prototype.concludedPlaying = function() {
	return this.mConcludedPlaying;
};

Survivor.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
