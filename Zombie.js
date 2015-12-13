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

Zombie.prototype.rewind = function() {
    Entity.prototype.rewind.call(this);

    this.body.velocity.setTo(0, 0);
};

Zombie.prototype.update = function(message) {
    Entity.prototype.update.call(this);

    if(this.isPlaying()) {
        this.mCounter -= this.game.time.elapsedMS;

        if(this.mCounter <= 0) {
            this.mWanderPoint.x = this.game.rnd.integerInRange(0, this.game.world.width);   // TODO: constrain withing moving area
            this.mWanderPoint.y = this.game.rnd.integerInRange(0, this.game.world.height);  // TODO: constrain withing moving area

            this.body.velocity.x = this.mWanderPoint.x - this.position.x;
            this.body.velocity.y = this.mWanderPoint.y - this.position.y;

            this.body.velocity.normalize().multiply(50, 50);

            this.mCounter = this.game.rnd.integerInRange(200, 500);
        }
    }
};
