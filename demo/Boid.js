var Boid = function(position) {
  SeekParticle.call(this, position);
  this.r = 3;
  this.maxspeed = 1;

  this.separate = function(boids) {
    var desiredseparation = 25;
    var steer = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var ds = p5.Vector.dist(this.position, boids[i].position);
      if (ds > 0 && ds < desiredseparation) {
        var diff = p5.Vector.sub(this.position, boids[i].position); //repelling force
        diff.normalize();
        diff.div(ds);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  this.align = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var ds = p5.Vector.dist(this.position, boids[i].position);
      if (ds > 0 && ds < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  this.cohesion = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var ds = p5.Vector.dist(this.position, boids[i].position);
      if (ds > 0 && ds < neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  this.flock = function(boids) {
    var sep = this.separate(boids);
    var ali = this.align(boids);
    var coh = this.cohesion(boids);
    sep.mult(5);
    ali.mult(1.0);
    coh.mult(.1);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  this.render = function() {
    var angle = this.velocity.heading() + PI / 2;
    push();
    fill(255, 255, 0);
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  this.isDead = function(tar) {
    var dis = p5.Vector.dist(this.position, tar);
    if (dis < this.r + 5) {
      return true;
    } else {
      return false;
    }
  }

  this.blowAwayForce = function(tar) {
    var f = p5.Vector.sub(this.position, tar);
    var dis = p5.Vector.dist(this.position, tar);
    f.setMag(10000);
    f.div(dis * dis * 0.001);
    this.acceleration.add(f);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

Boid.prototype = Object.create(SeekParticle.prototype);
Boid.constructor = Boid;