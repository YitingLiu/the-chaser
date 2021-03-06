var Flock = function() {
  this.boids = [];


  this.run = function(tar,s) {
    for (var i = 0; i < this.boids.length; i++) {
      var b = this.boids[i];
      if (b.isOver(tar,s) === true) {
        over = true;
      } else {
        b.flock(this.boids);
        var chasingForce = this.boids[i].chase(tar);
        chasingForce.mult(0.2);
        b.applyForce(chasingForce);
        b.update();
        b.check();
        b.render(tar);
        if (b.isDead()) {
          this.boids.splice(i, 1);
        }
      }
    }
  }

  this.addBoids = function(pos) {
    var num = random(4);
    for (var i = 0; i < random(num); i++) {
      var diff = createVector(random(-50, 50), random(-50, 50));
      this.boids.push(new Boid(p5.Vector.add(pos, diff)));
    }
  }

  this.blowAway = function(tar) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].blowAwayForce(tar);
      if(random(1)<0.04){
          this.boids.splice(i, 1);
      }
    }
  }
}