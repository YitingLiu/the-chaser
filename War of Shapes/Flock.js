var Flock = function() {
  this.boids = [];


  this.run = function(tar) {
    for (var i = 0; i < this.boids.length; i++) {
      if (this.boids[i].isDead(tar) === true) {
        over = true;
      } else {
        this.boids[i].flock(this.boids);
        var chasingForce = this.boids[i].seek(tar);
        chasingForce.mult(0.2);
        this.boids[i].applyForce(chasingForce);
        this.boids[i].update();
        this.boids[i].check();
        this.boids[i].render();
      }
    }
  }

  this.addBoids = function(pos) {
    for (var i = 0; i < 3; i++) {
      var diff = createVector(random(-50, 50), random(-50, 50));
      this.boids.push(new Boid(p5.Vector.add(pos, diff)));
    }
  }

  this.blowAway = function(tar) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].blowAwayForce(tar);
    }
  }
}

