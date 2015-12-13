Zombie = function (theGame, theX, theY) {
    // Call parent's class constructor
    Entity.call(this, theGame, theX, theY, 'zombie');

    // Init everything
    // TODO: add this
    this.mWanderPoint = new Phaser.Point();
    this.mCounter = 0;
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Zombie.prototype = Object.create(Entity.prototype);
Zombie.prototype.constructor = Survivor;

// Public methods

Zombie.prototype.play = function() {
    Entity.prototype.play.call(this);

    this.body.velocity.setTo(10, 10);
};

Zombie.prototype.update = function() {
    var aTarget;

    Entity.prototype.update.call(this);

    if(this.isPlaying()) {
        aTarget = this.findSurvivorWithinAttackRange();

        if(aTarget) {
            this.seek(aTarget, 60);

        } else {
            this.wander();
        }
    }
};

Zombie.prototype.wander = function() {
    this.mCounter -= this.game.time.elapsedMS;

    if(this.mCounter <= 0) {
        this.mWanderPoint.x = this.game.rnd.integerInRange(0, this.game.world.width);   // TODO: constrain withing moving area
        this.mWanderPoint.y = this.game.rnd.integerInRange(0, this.game.world.height);  // TODO: constrain withing moving area

        this.seek(this.mWanderPoint, 50);

        this.mCounter = this.game.rnd.integerInRange(500, 2000);
    }
};

Zombie.prototype.findSurvivorWithinAttackRange = function() {
    var aSurvivors,
        aTarget;

    aSurvivor = this.getPlayState().getSurvivors();

    aSurvivor.forEachAlive(function(theSurvivor, theIndex) {
        if(theSurvivor.position.distance(this.position) <= 100) {
            aTarget = theSurvivor;
        }
    }, this);

    return aTarget;
};
