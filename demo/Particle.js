var Particle = function(pos) {
  this.position = pos.copy();
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxspeed = 4;


  Particle.prototype.applyForce = function(f) {
    this.acceleration.add(f);
  }

  Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  Particle.prototype.check = function() {
    if (this.position.x < d) {
      this.position.x = d;
    } else if (this.position.x > width - d) {
      this.position.x = width - d;
    }

    if (this.position.y < d) {
      this.position.y = d;
    } else if (this.position.y > height - d) {
      this.position.y = height - d;
    }
  }

  Particle.prototype.render = function() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}