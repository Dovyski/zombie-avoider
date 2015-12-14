MenuState = function() {
	var mThing;
	var mDialog;
	var mThing;
	var mLogo;
	var mPlayText;
	var mCreditsText;
	var mPlayBtn;
	var mCreditsBtn;
	var mMusicTitle;

	this.create = function() {
		mThing = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'thing');
		mDialog = this.game.add.sprite(this.game.world.centerX, mThing.y - 170, 'dialog');
		mLogo = this.game.add.sprite(this.game.world.centerX, mDialog.y, 'logo');

		mPlayBtn = this.game.add.button(this.game.world.centerX, mThing.y + 20, 'button-long', this.onClickPlay, this, 1, 0, 2, 0);
		mCreditsBtn = this.game.add.button(this.game.world.centerX, mPlayBtn.y + 50, 'button-long', this.onClickCredits, this, 1, 0, 2, 0);

		mPlayText =  this.game.add.text(this.game.world.centerX, mPlayBtn.y + 2, "PLAY", {font: "20px Arial", fill: "#000000", align: "center"});
		mCreditsText =  this.game.add.text(this.game.world.centerX, mCreditsBtn.y + 2, "CREDITS", {font: "20px Arial", fill: "#000000", align: "center"});

		mThing.anchor.setTo(0.5);
		mDialog.anchor.setTo(0.5);
		mLogo.anchor.setTo(0.5);
		mPlayBtn.anchor.setTo(0.5);
		mCreditsBtn.anchor.setTo(0.5);
		mPlayText.anchor.setTo(0.5);
		mCreditsText.anchor.setTo(0.5);

		mMusicTitle = this.game.add.sound('title-music', 1, true);

		// Start title music as soon as possible
		this.game.sound.setDecodedCallback([mMusicTitle], function() {
			mMusicTitle.play();
		}, this);
	};

	this.onClickPlay = function() {
		mMusicTitle.stop();
		mMusicTitle.destroy();
		this.game.state.start('play');
	};

	this.onClickCredits = function() {
		mMusicTitle.stop();
		mMusicTitle.destroy();
		this.game.state.start('credits');
	};
};
