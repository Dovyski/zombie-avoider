PathPoint = function (game) {
    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, game, 0, 0, 'path-point');
    this.anchor.setTo(0.5);
    this.kill();
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
PathPoint.prototype = Object.create(Phaser.Sprite.prototype);
PathPoint.prototype.constructor = PathPoint;
