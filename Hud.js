Hud = function (theGame) {
    // Call parent's class (Phaser.Group) constructor
    Phaser.Group.call(this, theGame);

    // Init everything
    this.mPlayButton = new Phaser.Button(this.game, 30, this.game.world.height - 70, 'button', this.onClickPlay, this, 2, 1, 0);

    this.add(this.mPlayButton);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

// Public methods

Hud.prototype.onClickPlay = function() {
    var aState = this.getPlayState();

    if(aState.isSimulating()) {
        // TODO: change button to show the stop simulation meaning.
        aState.stopSimulation();
        console.debug('STOP simulation!');

    } else {
        // TODO: change button to start simulation
        aState.startSimulation();
        console.debug('START simulation!');
    }
};

Hud.prototype.showSummary = function() {
	// TODO: implement this!
	console.log('Hud summary!');
};

Hud.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
