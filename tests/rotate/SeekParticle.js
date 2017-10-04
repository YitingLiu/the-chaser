var SeekParticle = function(position) {
  Particle.call(this, position);
  this.maxspeed = 3;

  SeekParticle.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);
    var steer = p5.Vector.sub(desired, this.velocity);
    return steer;
  }

  Particle.prototype.render = function() {
    push();
    noStroke();
    fill(255, 0, 0, this.life);
    ellipse(this.position.x, this.position.y, 10, 10);
    pop();
   
    // blendMode(ADD);
    // for (var i = 0; i < 3; i++) {
    //   tint(255, this.life);
    //   image(img_red, this.position.x + random(-2, 2), this.position.y + random(-2, 2), 10, 10);
    // }

  }


}

SeekParticle.prototype = Object.create(Particle.prototype);
SeekParticle.constructor = SeekParticle;