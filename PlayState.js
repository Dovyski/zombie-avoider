/**
 * Describes the play state.
 */

var PlayState = function() {
	var mZombies;
	var mSurvivors;
	var mPathPoints;
	var mHud;
	var mSimulating;
	var mExitDoor;
	var mSurvivorsCount;
	var mScoreRescued;
	var mScoreDead;

	this.create = function() {
		var i;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		mPathPoints = this.game.add.group();
		mZombies = this.game.add.group();
		mSurvivors = this.game.add.group();

		mExitDoor = this.game.add.sprite(this.game.world.width - 80, 40, 'exit-door');
		mExitDoor.anchor.setTo(0.5);

		mSimulating = false;
		mScoreRescued = 0;
		mScoreDead = 0;
		mSurvivorsCount = 2;

		for(i = 0; i < mSurvivorsCount; i++) {
			mSurvivors.add(new Survivor(this.game, Math.random() * 100, Math.random() * 100));
		}

		for(i = 0; i < 5; i++) {
			mZombies.add(new Zombie(this.game, this.game.rnd.integerInRange(400, 500), this.game.rnd.integerInRange(400, 500)));
		}

		// Add a pool of poins
		for(i = 0; i < 200; i++) {
			mPathPoints.add(new PathPoint(this.game));
		}

		mHud = new Hud(this.game);
	};

	this.update = function() {
		var aShouldStopSimulation;

		if(mSimulating) {
			aShouldStopSimulation = this.updateSimulation();

			if(aShouldStopSimulation) {
				this.stopSimulation();
				mHud.showSummary();
			}
		}
	};

	this.updateSimulation = function() {
		var i,
			aLost = 0,
			aSurvivor;

		for(i = 0; i < mSurvivors.children.length; i++) {
			aSurvivor = mSurvivors.children[i];

			if(!aSurvivor) {
				continue;
			}

			if(aSurvivor.alive) {
				if(aSurvivor.position.distance(mExitDoor.position) <= 50) {
					aSurvivor.kill();
					mScoreRescued++;
					console.log('Rescured!', mScoreRescued);

				} else if(aSurvivor.concludedPlaying()) {
					aLost++;
				}
			}
		}

		// Return true if simulation should stop
		console.log(mScoreRescued + mScoreDead + aLost, mSurvivorsCount);
		return mScoreRescued + mScoreDead + aLost >= mSurvivorsCount;
	}

	this.startSimulation = function() {
		var i;

		mSimulating = true;
		mScoreRescued = 0;
		mScoreDead = 0;

		mSurvivors.forEach(function(theElement, theIndex) {
			theElement.play();
		}, this);

		mZombies.forEach(function(theElement, theIndex) {
			theElement.play();
		}, this);
	};

	this.stopSimulation = function() {
		mSimulating = false;
	};

	this.finishSimulation = function() {
		mSimulating = false;

		mEntities.forEach(function(theElement, theIndex) {
			theElement.rewind();
		}, this);

		mZombies.forEach(function(theElement, theIndex) {
			theElement.rewind();
		}, this);
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
