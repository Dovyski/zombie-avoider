/**
 * Describes the play state.
 */

var PlayState = function() {
	var mZombies;
	var mSurvivors;
	var mPathPoints;
	var mHud;
	var mSimulating;
	var mForegroundmExitDoor;
	var mSurvivorsCount;
	var mScoreRescued;
	var mScoreDead;
	var mBackground;
	var mStartArea;
	var mProps;
	var mForeground;
	var mLights;

	this.create = function() {
		var i;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		mBackground = this.game.add.sprite(0, 0, 'background');
		mStartArea = this.game.add.sprite(0, 0, 'start-area');
		mProps = this.game.add.group();

		mZombies = this.game.add.group();
		mSurvivors = this.game.add.group();

		mExitDoor = this.game.add.sprite(this.game.world.width - 60, this.game.world.height - 80, 'exit-door');
		mExitDoor.anchor.setTo(0.5);

		mSimulating = false;
		mScoreRescued = 0;
		mScoreDead = 0;
		mSurvivorsCount = 2;

		for(i = 0; i < mSurvivorsCount; i++) {
			mSurvivors.add(new Survivor(this.game, 80 + 80 * i, 40));
		}

		for(i = 0; i < 5; i++) {
			mZombies.add(new Zombie(this.game, this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(100, this.game.world.height - 80)));
		}

		mForeground = this.game.add.group();
		mLights = new Lights(this.game);

		mPathPoints = this.game.add.group();

		// Add a pool of poins
		for(i = 0; i < 400; i++) {
			mPathPoints.add(new PathPoint(this.game));
		}

		// Arrange all level stuff
		this.initLevel();

		// Init effects (smoke, lights, etc)
		this.initEffects();

		mHud = new Hud(this.game);
	};

	// TODO: get all this inform from a file
	this.initLevel = function() {
		var aCar;

		aCar = new Phaser.Sprite(this.game, 200, 457, 'cars');
		aCar.anchor.setTo(0.5);
		aCar.angle = 45;
		aCar.frame = 2;
		this.game.physics.enable(aCar, Phaser.Physics.ARCADE);
		aCar.body.immovable = true;
		mProps.add(aCar);

		aCar = new Phaser.Sprite(this.game, 550, 130, 'cars');
		aCar.anchor.setTo(0.5);
		aCar.angle = 145;
		aCar.frame = 0;
		this.game.physics.enable(aCar, Phaser.Physics.ARCADE);
		aCar.body.immovable = true;
		mProps.add(aCar);

		aCar = new Phaser.Sprite(this.game, 480, 500, 'cars');
		aCar.anchor.setTo(0.5);
		aCar.angle = 60;
		aCar.frame = 1;
		this.game.physics.enable(aCar, Phaser.Physics.ARCADE);
		aCar.body.immovable = true;
		mProps.add(aCar);

		aCar = new Phaser.Sprite(this.game, 700, 340, 'cars');
		aCar.anchor.setTo(0.5);
		aCar.angle = 200;
		aCar.frame = 1;
		this.game.physics.enable(aCar, Phaser.Physics.ARCADE);
		aCar.body.immovable = true;
		mProps.add(aCar);
	};

	// TODO: make this based on level props
	this.initEffects = function() {
		var aLight;

		aLight = new Phaser.Sprite(this.game, 25, 49, 'green-beam');
		this.game.add.tween(aLight).to({alpha: 0.1}, 500, Phaser.Easing.Linear.None, true, 0, -1, true).start();
		mForeground.add(aLight);

		aLight = new Phaser.Sprite(this.game, 200, 49, 'green-beam');
		this.game.add.tween(aLight).to({alpha: 0.1}, 500, Phaser.Easing.Linear.None, true, 0, -1, true).start();
		mForeground.add(aLight);

		aLight = new Phaser.Sprite(this.game, 723, 508, 'green-beam');
		this.game.add.tween(aLight).to({alpha: 0.1}, 500, Phaser.Easing.Linear.None, true, 0, -1, true).start();
		mForeground.add(aLight);

		aLight = new Phaser.Sprite(this.game, 555, 135, 'cops-lights');
		aLight.anchor.setTo(0.5);
		this.game.physics.enable(aLight, Phaser.Physics.ARCADE);
		aLight.body.angularVelocity = 300;
		mForeground.add(aLight);

		aLight = new Phaser.Sprite(this.game, 200, 450, 'cops-lights');
		aLight.anchor.setTo(0.5);
		this.game.physics.enable(aLight, Phaser.Physics.ARCADE);
		aLight.body.angularVelocity = 300;
		mForeground.add(aLight);
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

			this.game.physics.arcade.collide(mProps, mZombies);
			this.game.physics.arcade.collide(mProps, mSurvivors);
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

	this.getExitDoor = function() {
		return mExitDoor;
	};

	this.getPathPoint = function() {
		return mPathPoints.getFirstDead();
	};

	this.getSurvivors = function() {
		return mSurvivors;
	};
};
