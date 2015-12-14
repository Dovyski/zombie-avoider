/**
 * Show company logos and stuff here.
 * For now, show the brain rating logo.
 */

var BrandState = function() {
	var mBrainRating;

	this.create = function() {
		mBrainRating = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'brain-rating');

		mBrainRating.anchor.setTo(0.5, 0.5);

		this.game.add.tween(mBrainRating).from({alpha: 0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false).start();

		this.game.time.events.add(Phaser.Timer.SECOND * 3.5, function() {
			this.game.add.tween(mBrainRating).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false).start();
		}, this);

		this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
	        this.state.start('menu');
	    }, this);
	};
};
