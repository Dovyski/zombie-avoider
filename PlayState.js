/**
 * Describes the play state.
 */

var PlayState = function() {
	var mZombies;
	var mSurvivors;

	this.create = function() {
		var i;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		mZombies = this.game.add.group();
		mSurvivors = this.game.add.group();

		for(i = 0; i < 5; i++) {
			mSurvivors.add(new Survivor(this, Math.random() * 100, Math.random() * 100));
		}
	};

	this.update = function() {

	};
};
