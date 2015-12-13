/**
 * Loads all assets used by the game
 */

var LoadState = function() {
	this.create = function() {
		this.state.start('play');
	};

	this.preload = function() {
		// hc, CC-BY 3.0, http://opengameart.org/content/road-tile-textures
		// Riley Gombart, CC0, http://opengameart.org/content/animated-top-down-zombie
		// artisticdude, CC0, http://opengameart.org/content/zombies-sound-pack
		// tokka, CC-BY 3.0, http://opengameart.org/content/top-down-runner
		// sujit1717, CC0, http://opengameart.org/content/free-top-down-car-sprites-by-unlucky-studio
		// Riley Gombart, CC-BY 3.0, http://opengameart.org/content/animated-top-down-survivor-player
		// H-Hour, CC0, http://opengameart.org/content/street-lines
		//  Marc Russell, CC-BY 3.0, www.spicypixel.net, http://opengameart.org/content/alien-breed-esque-top-down-tilesheet
		// Osmic, CC-BY 3.0, http://opengameart.org/content/zombie-ui-pack

		this.load.image('background', 'assets/background.png');
		this.load.image('start-area', 'assets/start-area.png');
		this.load.image('exit-door', 'assets/exit-door.png');
		this.load.image('path-point', 'assets/path-point.png');
		this.load.spritesheet('survivor', 'assets/survivor.png', 50, 49);
		this.load.spritesheet('zombie', 'assets/zombie.png', 54, 50);
	};
};
