var Boid = function(position) {
  SeekParticle.call(this, position);
  this.life = 255;
  this.lifesub = 5;
  this.n = floor(random(1, 7));
  this.size_random=random(0.3,0.6);
  this.size = em[this.n].width * this.size_random;
  this.maxspeed = 1;
  // this.off = random(100);
  
  this.chase = function(target) {
    var f = p5.Vector.sub(target, this.position);
    return f;
  }
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

  this.render = function(tar) {
    var angle = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle); 
    var off=p5.Vector.sub(tar,this.position);
    off.setMag(1);   
    image(em[0], off.x, off.y, em[0].width * this.size_random, em[0].height * this.size_random);
    image(em[this.n], 0, 0, em[this.n].width * this.size_random, em[this.n].height * this.size_random);
    pop();
  }

  this.isOver = function(tar,s) {
    var dis = p5.Vector.dist(this.position, tar);
    if (dis < (this.size + s)/2) {
      return true;
    } else {
      return false;
    }
  }

  this.blowAwayForce = function(tar) {
    var f = p5.Vector.sub(this.position, tar);
    f.setMag(20);
    this.acceleration.add(f);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

Boid.prototype = Object.create(SeekParticle.prototype);
Boid.constructor = Boid;