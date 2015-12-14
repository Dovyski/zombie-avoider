Hud = function (theGame) {
    // Call parent's class (Phaser.Group) constructor
    Phaser.Group.call(this, theGame);

    // Init everything
    this.mPlayButton = new Phaser.Button(this.game, 15, this.game.world.height - 90, 'button', this.onClickPlay, this, 1, 0, 2, 0);
    this.mDialog = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY - 20, 'dialog');
    this.mTitle = new Phaser.Text(this.game, this.game.world.centerX, this.mDialog.y - 20, "", { font: "Bold 44px Arial", fill: "#ffffff", align: "center" });
    this.mInfo = new Phaser.Text(this.game, this.game.world.centerX, this.mTitle.y + 40, "", { font: "24px Arial", fill: "#ffffff", align: "center" });
    this.mClick = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.height - 80, "Click anywhere to continue", { font: "20px Arial", fill: "#fcfcfc", align: "center" });
    this.mEditFrame = new Phaser.Sprite(this.game, 0, 0, 'edit-frame');
    this.mEditText = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.height - 12, "EDIT MODE", { font: "Bold 14px Arial", fill: "#ffffff", align: "center" });

    this.mTitle.anchor.setTo(0.5);
    this.mInfo.anchor.setTo(0.5);
    this.mDialog.anchor.setTo(0.5);
    this.mClick.anchor.setTo(0.5);
    this.mEditText.anchor.setTo(0.5);

    this.hideSummary();

    this.game.add.tween(this.mClick).to({alpha: 0.4}, 300, Phaser.Easing.Linear.None, true, 0, -1, true).start();
    this.game.add.tween(this.mEditText).to({alpha: 0.4}, 300, Phaser.Easing.Linear.None, true, 0, -1, true).start();

    this.add(this.mDialog);
    this.add(this.mTitle);
    this.add(this.mInfo);
    this.add(this.mClick);
    this.add(this.mEditFrame);
    this.add(this.mEditText);
    this.add(this.mPlayButton);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

// Public methods

Hud.prototype.onClickPlay = function() {
    var aState = this.getPlayState();

    if(aState.isSimulating()) {
        aState.stopSimulation();
        this.mPlayButton.setFrames(1, 0, 2, 0);
        this.mEditFrame.visible = true;
        this.mEditText.visible = true;

    } else {
        aState.startSimulation();
        this.mPlayButton.setFrames(4, 5, 6, 4);
        this.mEditFrame.visible = false;
        this.mEditText.visible = false;
    }
};

Hud.prototype.showSummary = function(theTitle, theText) {
    this.mDialog.visible = true;
    this.mTitle.visible = true;
    this.mInfo.visible = true;
    this.mClick.visible = true;
    this.mPlayButton.visible = false;
    this.mEditFrame.visible = false;
    this.mEditText.visible = false;

    this.mTitle.text = theTitle;
    this.mInfo.text = theText;

    this.game.add.tween(this.mDialog).from({y: this.game.world.height}, 300, Phaser.Easing.Linear.None, true, 0, 0, false).start();
    this.game.add.tween(this.mTitle).from({y: this.game.world.height}, 300, Phaser.Easing.Linear.None, true, 0, 0, false).start();
    this.game.add.tween(this.mInfo).from({y: this.game.world.height}, 300, Phaser.Easing.Linear.None, true, 0, 0, false).start();
    this.game.add.tween(this.mClick).from({y: this.game.world.height}, 300, Phaser.Easing.Linear.None, true, 0, 0, false).start();
};

Hud.prototype.hideSummary = function() {
    this.mDialog.visible = false;
    this.mTitle.visible = false;
    this.mInfo.visible = false;
    this.mClick.visible = false;
    this.mPlayButton.visible = true;
    this.mEditFrame.visible = true;
    this.mEditText.visible = true;

    this.mPlayButton.setFrames(1, 0, 2, 0);
};

Hud.prototype.isSummaryActive = function() {
    return this.mTitle.visible;
}

Hud.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
