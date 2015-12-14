InstructionsState = function() {
	var mBackground;
	var mStep0;
	var mStep1;

	this.create = function() {
		mBackground = this.game.add.sprite(0, 0, 'instructions-background');
		mStep0 = this.game.add.sprite(0, 0, 'instructions0');
		mStep1 = this.game.add.sprite(0, 0, 'instructions1');

		this.game.add.tween(mStep1).to({alpha: 0.3}, 500, Phaser.Easing.Linear.None, true, 0, -1, true).start();
	};

	this.update = function() {
		if(this.game.input.activePointer.isDown) {
			this.game.state.start('play');
		}
	};
};
