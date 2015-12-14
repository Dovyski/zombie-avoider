CreditsState = function() {
	var mMusicTitle;

	this.create = function() {
		mMusicTitle = new Phaser.Sound(this.game, 'title-music', 1, true);

		// Start title music as soon as possible
		this.game.sound.setDecodedCallback([mMusicTitle], function() {
			if(this.game.state.current == 'credits') {
				mMusicTitle.play();
			}
		}, this);
	};

	this.update = function() {
		if(this.game.input.activePointer.isDown) {
			mMusicTitle.stop();
			mMusicTitle.destroy();
			this.game.state.start('menu');
		}
	};
};
