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

		mExitDoor = this.game.add.sprite(this.game.world.width - 30, this.game.world.centerY - 40, 'exit-door');
		mExitDoor.anchor.setTo(0.5);

		mSimulating = false;
		mScoreRescued = 0;
		mScoreDead = 0;
		mSurvivorsCount = 2;

		for(i = 0; i < mSurvivorsCount; i++) {
			mSurvivors.add(new Survivor(this.game, Math.random() * 100, Math.random() * 100));
		}

		for(i = 0; i < 5; i++) {
			mZombies.add(new Zombie(this.game, this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(100, this.game.world.height - 80)));
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
			this.game.physics.arcade.overlap(mSurvivors, mZombies, this.onAttackOverlap, null, this);

			aShouldStopSimulation = this.updateSimulation();

			if(aShouldStopSimulation) {
				this.pauseSimulation();
				mHud.showSummary();
			}
		}
	};

	this.onAttackOverlap = function(theSurvivor, theZombie) {
		mScoreDead++;
		theSurvivor.kill();	// TODO: add blood on the floor.
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
		console.log(mScoreRescued, mScoreDead, aLost, mSurvivorsCount);
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

	this.pauseSimulation = function() {
		mSimulating = false;
	};

	this.stopSimulation = function() {
		mSimulating = false;

		mSurvivors.forEach(function(theElement, theIndex) {
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
