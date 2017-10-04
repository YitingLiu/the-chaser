var RandomParticle = function() {
  Particle.call(this, createVector(random(d, width - d), random(d, height - d)));
  this.offset = createVector(random(1000), random(1000, 2000), random(2000, 3000));
  this.addition = createVector(0.001, 0.001, 0.01);

  this.update = function() {
    this.position.x = map(noise(this.offset.x), 0, 1, 0, width);
    this.position.y = map(noise(this.offset.y), 0, 1, 0, height);
    this.offset.add(this.addition);
  }

  this.render = function() {
    push();
    fill(0, 255, 0);
    translate(this.position.x, this.position.y);
    var angle = map(noise(this.offset.z), 0, 1, 0, TWO_PI);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, 8, 8);
    pop();
  }

  this.isDead = function(tar) {
    var dis = p5.Vector.dist(this.position, tar);
    if (dis < 10) {
      return true;
    } else {
      return false;
    }
  }

}

RandomParticle.prototype = Object.create(Particle.prototype);
RandomParticle.constructor = RandomParticle;