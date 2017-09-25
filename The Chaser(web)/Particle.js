var Particle = function(pos) {
  this.position = pos.copy();
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxspeed = 4;
  this.life = 255;
  this.lifesub = 10;


  Particle.prototype.applyForce = function(f) {
    this.acceleration.add(f);
  }

  Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.life -= this.lifesub;
  }

  Particle.prototype.check = function() {
    if (this.position.x < this.size / 2) {
      this.position.x = this.size / 2;
    } else if (this.position.x > width - this.size / 2) {
      this.position.x = width - this.size / 2;
    }

    if (this.position.y < this.size / 2) {
      this.position.y = this.size / 2;
    } else if (this.position.y > height - this.size / 2) {
      this.position.y = height - this.size / 2;
    }
  }

  // Particle.prototype.render = function() {
  //   noStroke();
  //   fill(255, 0, 0, this.life);
  //   ellipse(this.position.x, this.position.y, 10, 10);
  // }

  Particle.prototype.isDead = function() {
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }
}