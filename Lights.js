// Adapted from: http://www.html5gamedevs.com/topic/6771-masking-to-simulate-light-area/

Lights = function (theGame) {
    // Call parent's class (Phaser.Group) constructor
    Phaser.Group.call(this, theGame);

    this.mShadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    this.mLightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.mShadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    this.mLightSprite.blendMode = Phaser.blendModes.MULTIPLY;
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Lights.prototype = Object.create(Phaser.Group.prototype);
Lights.prototype.constructor = Lights;

// Public methods

Lights.prototype.update = function() {
    var aSurvivors,
        aRadius,
        aPosX,
        aPosY,
        i,
        aTotal,
        aSurvivor;

    Phaser.Group.prototype.update.call(this);

    // Draw shadow
    this.mShadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.mShadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    aRadius = 100 + this.game.rnd.integerInRange(1 , 10);

    aSurvivors = this.getPlayState().getSurvivors().children;
    aTotal = aSurvivors.length;

    for(i = 0; i < aTotal; i++) {
        aSurvivor = aSurvivors[i];

        if(aSurvivor && aSurvivor.alive) {
            // Draw circle of light with a soft edge
            this.createLightSpot(aSurvivor, aRadius);
        }
    }

    this.createLightSpot(this.getPlayState().getExitDoor(), aRadius);

    // This just tells the engine it should update the texture cache
    this.mShadowTexture.dirty = true;
};

Lights.prototype.createLightSpot = function(thePos, theRadius) {
    var aGradient;

    aGradient = this.mShadowTexture.context.createRadialGradient(thePos.x, thePos.y, 100 * 0.75, thePos.x, thePos.y, theRadius);
    aGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    aGradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.mShadowTexture.context.beginPath();
    this.mShadowTexture.context.fillStyle = aGradient;
    this.mShadowTexture.context.arc(thePos.x, thePos.y, theRadius, 0, Math.PI*2, false);
    this.mShadowTexture.context.fill();
}

Lights.prototype.getPlayState = function() {
	return this.game.state.states[this.game.state.current];
};
