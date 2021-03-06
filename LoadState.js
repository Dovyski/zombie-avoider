/**
 * Loads all assets used by the game
 */

var LoadState = function() {
	this.create = function() {
		this.state.start('brand');
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
		// Ravenmore, CC-BY 3.0, http://dycha.net, http://opengameart.org/content/fantasy-ui-elements-by-ravenmore
		// Dakal, CC-By 3.0, http://opengameart.org/content/zombie-gui
		// Osmic, CC-BY 3.0, http://opengameart.org/content/zombie-logo-diy-kit
		// h0rtl4kk, CC0, http://opengameart.org/content/ui-pack-1
		//
		// Corsica_S, CC0, http://opengameart.org/content/42-snow-and-gravel-footsteps
		// copyc4t, CC-BY 3.0, http://opengameart.org/content/day-1-cinematic-transition-sound
		// artisticdude, CC0, http://opengameart.org/content/zombies-sound-pack
		// Independent.nu, CC0, http://opengameart.org/content/2-wooden-squish-splatter-sequences
		// Socapex, CC-BY-SA 3.0, http://opengameart.org/content/dark-ambiance
		// Alexandr Zhelanov, CC-BY 3.0, https://soundcloud.com/alexandr-zhelanov, http://opengameart.org/content/closed-area

		this.mProgressFill = this.game.add.sprite(this.game.world.centerX - 120, this.game.world.centerY - 10, 'progressbar-fill');
		this.mProgress = this.game.add.sprite(this.game.world.centerX - 120, this.game.world.centerY - 10, 'progressbar');

		this.load.setPreloadSprite(this.mProgress);

		this.load.image('brain-rating', 'assets/brain-rating.png'); // Here: http://www.as3gamegears.com/extras/brain-rating-for-games/
		this.load.image('background', 'assets/background.png');
		this.load.image('start-area', 'assets/start-area.png');
		this.load.image('exit-door', 'assets/exit-door.png');
		this.load.image('path-point', 'assets/path-point.png');
		this.load.image('green-beam', 'assets/green-beam.png');
		this.load.image('cops-lights', 'assets/cops-lights.png');
		this.load.image('thing', 'assets/thing.png');
		this.load.image('dialog', 'assets/dialog.png');
		this.load.image('logo', 'assets/logo.png');
		this.load.image('edit-frame', 'assets/edit-frame.png?4');
		this.load.image('instructions0', 'assets/instructions0.png');
		this.load.image('instructions1', 'assets/instructions1.png');
		this.load.image('instructions-background', 'assets/instructions-background.jpg');

		this.load.spritesheet('survivor', 'assets/survivor.png', 50, 49);
		this.load.spritesheet('zombie', 'assets/zombie.png', 54, 50);
		this.load.spritesheet('cars', 'assets/cars.png', 65, 132);
		this.load.spritesheet('button', 'assets/button.png', 64, 65);
		this.load.spritesheet('button-long', 'assets/button-long.png', 169, 42);

		this.load.audio('planning-music', 'assets/sound/socapex.mp3');
		this.load.audio('title-music', 'assets/sound/closed-area.mp3');
		this.load.audio('walk', 'assets/sound/corsica-walk.mp3');
		this.load.audio('final', 'assets/sound/day1.mp3');
		this.load.audio('zombie0', 'assets/sound/zombie-8.mp3');
		this.load.audio('zombie1', 'assets/sound/zombie-9.mp3');
		this.load.audio('zombie2', 'assets/sound/zombie-12.mp3');
		this.load.audio('zombie3', 'assets/sound/zombie-15.mp3');
		this.load.audio('zombie4', 'assets/sound/zombie-17.mp3');
		this.load.audio('zombie5', 'assets/sound/zombie-19.mp3');
		this.load.audio('zombie6', 'assets/sound/zombie-21.mp3');
		this.load.audio('killed', 'assets/sound/killed.mp3');

		this.load.json('levels', 'assets/levels.json');
	};
};
