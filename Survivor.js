Survivor = function (theGame, theX, theY) {
    // Call parent's class constructor
    Entity.call(this, theGame, theX, theY, 'survivor');

    // Init everything
    this.mPathPoints = []; 								// points this survivor is following
	this.mCurrentPoint = 0;								// current point in the path.
	this.mCounter = 0;
	this.mDrawingPath = false;

	// Mouse input
	this.inputEnabled = true;
    this.events.onInputOver.add(this.onMouseOver, this);
    this.events.onInputOut.add(this.onMouseOut, this);
    this.events.onInputDown.add(this.onMouseDown, this);
    this.events.onInputUp.add(this.onMouseUp, this);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Survivor.prototype = Object.create(Entity.prototype);
Survivor.prototype.constructor = Survivor;

// Public methods

Survivor.prototype.update = function(message) {
    Entity.prototype.update.call(this);

	this.mCounter -= this.game.time.elapsedMS;

	if(this.isPlaying()) {
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

	// Call super class method.
	Entity.prototype.play.call(this);

	this.mCurrentPoint = 0;

	aPoint = this.mCurrentPoint < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint] : null;

	if(aPoint) {
		this.body.velocity.x = aPoint.x - this.position.x;
		this.body.velocity.y = aPoint.y - this.position.y;
	}
};

Survivor.prototype.updatePlaying = function() {
	var aCurrentPoint,
		aNextPoint;

	aCurrentPoint = this.mCurrentPoint < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint] : null;

	if(aCurrentPoint && this.position.distance(aCurrentPoint) <= 20) {
		aNextPoint = (this.mCurrentPoint + 1) < this.mPathPoints.length ? this.mPathPoints[this.mCurrentPoint + 1] : null;

		if(aNextPoint) {
			this.body.velocity.x = aNextPoint.x - aCurrentPoint.x;
			this.body.velocity.y = aNextPoint.y - aCurrentPoint.y;

		} else {
			this.markConcludedPlaying();
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
	if(!this.isPlaying()) {
		this.mDrawingPath = true;
		this.erasePath();
	}
};

Survivor.prototype.onMouseUp = function() {
	this.mDrawingPath = false;
};

Survivor.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
