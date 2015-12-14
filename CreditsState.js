var TEXT =
'Zombie Avoid\n\n' +

'A game made for LD34\n\n' +

'[Coding/Game Design]\n' +
'Fernando "As3GameGears" Bevilacqua\n' +

'\n[Art]\n' +
'hc (opengameart.org/content/road-tile-textures) \n' +
'Riley Gombart (opengameart.org/content/animated-top-down-zombie) \n' +
'artisticdude (opengameart.org/content/zombies-sound-pack) \n' +
'tokka (opengameart.org/content/top-down-runner) \n' +
'sujit1717 (opengameart.org/content/free-top-down-car-sprites-by-unlucky-studio) \n' +
'Riley Gombart (opengameart.org/content/animated-top-down-survivor-player) \n' +
'H-Hour (opengameart.org/content/street-lines) \n' +
'Marc Russell (www.spicypixel.net) \n' +
'Osmic (opengameart.org/content/zombie-ui-pack) \n' +
'Ravenmore (dycha.net, (opengameart.org/content/fantasy-ui-elements-by-ravenmore) \n' +
'Dakal (opengameart.org/content/zombie-gui) \n' +
'Osmic (opengameart.org/content/zombie-logo-diy-kit) \n' +
'h0rtl4kk (opengameart.org/content/ui-pack-1) \n' +

'\n[SFX]\n\n' +
'Corsica_S (opengameart.org/content/42-snow-and-gravel-footsteps) \n' +
'copyc4t (opengameart.org/content/day-1-cinematic-transition-sound) \n' +
'artisticdude (opengameart.org/content/zombies-sound-pack) \n' +
'Independent.nu (opengameart.org/content/2-wooden-squish-splatter-sequences) \n' +

'\n[Music]\n\n' +
'Socapex (opengameart.org/content/dark-ambiance) \n' +
'Alexandr Zhelanov (soundcloud.com/alexandr-zhelanov) \n' +

'\n[Acknowledgement]\n\n' +
'Richard "Photonstorm" Davey and Phaser\n' +
'Twitter gamedev folks';

CreditsState = function() {
	var mText;
	var mTextClick;

	this.create = function() {
		mText =  this.game.add.text(this.game.world.centerX, this.game.world.height + 300, TEXT, {font: "20px Arial", fill: "#ffffff", align: "center"});
		mTextClick = this.game.add.text(this.game.world.centerX, this.game.world.height - 40, "Click anywhere to continue", { font: "20px Arial", fill: "#ffffff", align: "center" });

		mText.anchor.setTo(0.5);
		mTextClick.anchor.setTo(0.5);

		this.game.add.tween(mTextClick).to({alpha: 0.4}, 300, Phaser.Easing.Linear.None, true, 0, -1, true).start();
	};

	this.update = function() {
		mText.y -= 0.2;

		if(mText.y + mText.height <= 0) {
			mText.y = this.game.world.height;
		}

		if(this.game.input.activePointer.isDown) {
			this.game.state.start('menu');
		}
	};
};
