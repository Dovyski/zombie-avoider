/**
 * Describes the play state.
 */

var PlayState = function() {
	var mZombies;
	var mSurvivors;
	var mPathPoints;
	var mHud;
	var mSimulating;

	this.create = function() {
		var i;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		mPathPoints = this.game.add.group();
		mZombies = this.game.add.group();
		mSurvivors = this.game.add.group();

		mSimulating = false;

		for(i = 0; i < 5; i++) {
			mSurvivors.add(new Survivor(this, Math.random() * 100, Math.random() * 100));
		}

		// Add a pool of poins
		for(i = 0; i < 200; i++) {
			mPathPoints.add(new PathPoint(this));
		}

		mHud = new Hud(this.game);
	};

	this.update = function() {
	};

	this.startSimulation = function() {
		mSimulating = true;

	    for(var i = 0; i < mSurvivors.children.length; i++) {
			if(mSurvivors.children[i]) {
				mSurvivors.children[i].play();
			}
	    }
	};

	this.stopSimulation = function() {
		mSimulating = false;

		for(var i = 0; i < mSurvivors.children.length; i++) {
			if(mSurvivors.children[i]) {
				mSurvivors.children[i].rewind();
			}
	    }
	};

	this.isSimulating = function() {
		return mSimulating;
	};


	this.getPathPoint = function() {
		return mPathPoints.getFirstDead();
	};

	this.getSurvivors = function() {
		return mSurvivors;
	};
};
