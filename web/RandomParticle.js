var RandomParticle = function() {
  Particle.call(this, createVector(random(width), random(height)));
  this.offset = createVector(random(1000), random(1000, 2000), random(2000, 3000));
  this.addition = createVector(0.001, 0.001, 0.01);
  this.n = floor(random(1, 7));
  this.size_random=random(0.4,0.7)
  this.size = eg[this.n].width*this.size_random;
  this.size0 = eg[0].width*this.size_random;

  this.update = function() {
    this.position.x = map(noise(this.offset.x), 0, 1, 0, width);
    this.position.y = map(noise(this.offset.y), 0, 1, 0, height);
    this.offset.add(this.addition);
  }

  this.render = function(tar) {
    push();
    translate(this.position.x, this.position.y);
    var angle = map(noise(this.offset.z), 0, 1, 0, TWO_PI);
    rotate(angle);
    var off=p5.Vector.sub(tar,this.position);
    off.setMag(1);
    image(eg[0], off.x, off.y, this.size0, this.size0);
    image(eg[this.n], 0, 0, this.size, this.size);
    pop();
  }

  this.attract = function(tar,s) {
    var f=p5.Vector.sub(tar,this.position);
    if (f.mag() < (this.size + s)) {
      f.mult(0.5);
      this.acceleration.add(f);
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
  }
}

  this.isDead = function(tar,s) {
    var dis = p5.Vector.dist(this.position, tar);
    if (dis < (this.size + s)/2) {
      return true;
    } else {
      return false;
    }
  }
}


RandomParticle.prototype = Object.create(Particle.prototype);
RandomParticle.constructor = RandomParticle;