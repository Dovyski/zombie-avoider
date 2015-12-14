/**
 * Loads the bare minimum required to create a decent loading screen
 */

// Global info used in the game
GameInfo = {
	level: 0
};

var BootState = function() {
	this.create = function() {
		this.state.start('load');
	};

	this.preload = function() {
		this.load.image('progressbar', 'assets/progressbar.png');
		this.load.image('progressbar-fill', 'assets/progressbar-fill.png');
	};
};
