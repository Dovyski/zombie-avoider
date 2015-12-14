/**
 * Describes the play state.
 */

PlayState = function() {
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
	var mZombieSfxCounter;
	var mLevel;

	var mMusicTitle;
	var mMusicPlanning;
	var mSfxWalking;
	var mSfxZombies;
	var mSfxKilled;

	this.create = function() {
		var i, aLevels;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// Init random number generator
		this.game.rnd.sow([12234]);

		// Load level structure
		aLevels = this.game.cache.getJSON('levels');
		mLevel = aLevels[GameInfo.level];

		this.initSounds();

		mBackground = this.game.add.sprite(0, 0, mLevel.background);
		mStartArea = this.game.add.sprite(mLevel.start.x, mLevel.start.y, 'start-area');
		mProps = this.game.add.group();

		mZombies = this.game.add.group();
		mSurvivors = this.game.add.group();

		mExitDoor = this.game.add.sprite(mLevel.exit.x, mLevel.exit.y, 'exit-door');
		mExitDoor.anchor.setTo(0.5);

		mSimulating = false;
		mScoreRescued = 0;
		mScoreDead = 0;
		mSurvivorsCount = mLevel.survivors.length;
		mZombieSfxCounter = 0;

		for(i = 0; i < mSurvivorsCount; i++) {
			mSurvivors.add(new Survivor(this.game, mLevel.survivors[i].x, mLevel.survivors[i].y));
		}

		for(i = 0; i < mLevel.zombies.length; i++) {
			mZombies.add(new Zombie(this.game, mLevel.zombies[i].x, mLevel.zombies[i].y));
		}

		mForeground = this.game.add.group();
		mLights = new Lights(this.game);

		mPathPoints = this.game.add.group();

		// Add a pool of poins
		for(i = 0; i < 400; i++) {
			mPathPoints.add(new PathPoint(this.game));
		}

		// Arrange all level stuff / effects (smoke, lights, etc)
		this.initProps();

		mHud = new Hud(this.game);
	};

	this.initSounds = function() {
		mMusicTitle = new Phaser.Sound(this.game, 'title-music', 1, true);
		mMusicPlanning = new Phaser.Sound(this.game, 'planning-music', 1, true);
		mSfxWalking = new Phaser.Sound(this.game, 'walk', 0.2, true);
		mSfxFinal = new Phaser.Sound(this.game, 'final', 0.5, false);
		mSfxKilled = new Phaser.Sound(this.game, 'killed', 0.5, false);

		mSfxZombies = [];

		for(var i = 0; i < 7; i++) {
			mSfxZombies.push(new Phaser.Sound(this.game, 'zombie' + i, 0.4, false));
		}

		// Start title music as soon as possible
		this.game.sound.setDecodedCallback([mMusicPlanning], function() {
			mMusicPlanning.play();
		}, this);
	};

	this.initProps = function() {
		var aProp, i;

		for(i = 0; i < mLevel.props.length; i++) {
			switch(mLevel.props[i].type) {
				case 'car':
					aProp = new Phaser.Sprite(this.game, mLevel.props[i].x, mLevel.props[i].y, mLevel.props[i].asset);
					aProp.anchor.setTo(0.5);
					aProp.angle = mLevel.props[i].angle;
					aProp.frame = mLevel.props[i].frame;
					this.game.physics.enable(aProp, Phaser.Physics.ARCADE);
					aProp.body.immovable = true;
					mProps.add(aProp);
					break;

				case 'light':
					aProp = new Phaser.Sprite(this.game, mLevel.props[i].x, mLevel.props[i].y, mLevel.props[i].asset);
					this.game.add.tween(aProp).to({alpha: 0.1}, mLevel.props[i].speed, Phaser.Easing.Linear.None, true, 0, -1, true).start();
					mForeground.add(aProp);
					break;

				case 'spin':
					aProp = new Phaser.Sprite(this.game, mLevel.props[i].x, mLevel.props[i].y, mLevel.props[i].asset);
					aProp.anchor.setTo(0.5);
					this.game.physics.enable(aProp, Phaser.Physics.ARCADE);
					aProp.body.angularVelocity = mLevel.props[i].speed;
					mForeground.add(aProp);
					break;
			}
		}
	};

	this.update = function() {
		var aShouldStopSimulation;

		this.game.physics.arcade.collide(mProps, mZombies);
		this.game.physics.arcade.collide(mProps, mSurvivors);

		if(mSimulating) {
			this.game.physics.arcade.overlap(mSurvivors, mZombies, this.onAttackOverlap, null, this);

			aShouldStopSimulation = this.updateSimulation();

			if(aShouldStopSimulation) {
				this.pauseSimulation();
				this.showLevelUpOrGameOver();
			}

			mZombieSfxCounter -= this.game.time.elapsedMS;

			if(mZombieSfxCounter <= 0) {
				mSfxZombies[this.rnd.integerInRange(0, mSfxZombies.length - 1)].play();
				mZombieSfxCounter = this.rnd.integerInRange(1000, 2500);
			}

		} else if(mHud.isSummaryActive() && this.game.input.activePointer.isDown) {
			// Where should we go? Next level or just restart
			// the current one?
			if(this.shouldLevelUp()) {
				GameInfo.level++;
				this.state.start('play');

			} else {
				this.stopSimulation();
				mHud.hideSummary();
			}
		}
	};

	this.showLevelUpOrGameOver = function() {
		mMusicTitle.stop();
		mMusicPlanning.stop();
		mSfxFinal.play();

		if(this.shouldLevelUp()) {
			mHud.showSummary('You did it!', 'Number of rescued survivors: ' + mScoreRescued);

		} else {
			mHud.showSummary('No one survived', 'Better luck next time');
		}
	};

	this.shouldLevelUp = function() {
		return mScoreRescued > 0; // TODO: check number of required survivors
	};

	this.onAttackOverlap = function(theSurvivor, theZombie) {
		mSfxKilled.play();
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

		mSfxWalking.play();
		mMusicTitle.play();
		mMusicPlanning.stop();

		mSurvivors.forEach(function(theElement, theIndex) {
			theElement.play();
		}, this);

		mZombies.forEach(function(theElement, theIndex) {
			theElement.play();
		}, this);
	};

	this.pauseSimulation = function() {
		mSimulating = false;
		mSfxWalking.pause();
	};

	this.stopSimulation = function() {
		mSimulating = false;
		mSfxWalking.stop();

		mMusicTitle.stop();
		mMusicPlanning.play();

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

	this.getLevelStructure = function() {
		return mLevel;
	}
};
