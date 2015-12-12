/**
 * Loads all assets used by the game
 */

var LoadState = function() {
	this.create = function() {
		this.state.start('play');
	};

	this.preload = function() {
		this.load.spritesheet('survivor', 'assets/runner.png', 64, 56); // Public domain, http://opengameart.org/content/classic-hero-and-baddies-pack
	};
};
