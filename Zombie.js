Zombie = function (theGame, theX, theY) {
    // Call parent's class constructor
    Entity.call(this, theGame, theX, theY, 'zombie');

    // Init everything
    // TODO: add this
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Zombie.prototype = Object.create(Entity.prototype);
Zombie.prototype.constructor = Survivor;

// Public methods

Zombie.prototype.update = function(message) {
    Entity.prototype.update.call(this);

    if(this.isPlaying()) {
        // TODO: move and stuff
    }
};
