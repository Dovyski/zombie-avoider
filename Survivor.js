Survivor = function (game, x, y) {
    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, game, x, y, 'survivor');

    // Init everything
    this.path = []; 	// points this survivor is following
	this.currentPoint;	// current point in the path.

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
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Survivor.prototype = Object.create(Phaser.Sprite.prototype);
Survivor.prototype.constructor = Survivor;

// Public methods

Survivor.prototype.update = function(message) {
    Phaser.Sprite.prototype.update.call(this);
};

Survivor.prototype.onMouseOver = function() {
    console.log('mouse over');
};

Survivor.prototype.onMouseOut = function() {
    console.log('mouse out');
};

Survivor.prototype.onMouseDown = function() {
    console.log('mouse down');
	this.body.velocity.setTo(50, 50);
};
