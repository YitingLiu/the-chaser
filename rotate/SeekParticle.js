var SeekParticle = function(position) {
  Particle.call(this, position);
  this.maxspeed = 3;
  this.angle = 0;
  this.size = me[1].width * 0.8;
  this.size0 = me[0].width * 0.8; // shadow

  SeekParticle.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);
    var steer = p5.Vector.sub(desired, this.velocity);
    return steer;
  }

  SeekParticle.prototype.render = function() {
    push();
    translate(this.position.x, this.position.y);
    noFill();
    rotate(-0.5);
    var an = TWO_PI / full;
    for (var i = 0; i < bomb; i++) {
      stroke(255, 17, 44, 200);
      strokeWeight(4);
      strokeCap(PROJECT);
      arc(0, 0, 60, 60, an * i + 0.1, an * (i + 1) - 0.1);
    }
    for (i = bomb + 1; i < full; i++) {
      strokeWeight(1);
      stroke(255, 17, 44, 50);
      arc(0, 0, 60, 60, an * i + 0.1, an * (i + 1) - 0.1);
    }
    var yu = energy % level;
    var ang = (an - 0.2) / level;

    for (i = 0; i < yu; i++) {
      stroke(255, 17, 44, 200);
      strokeWeight(4);
      strokeCap(PROJECT);
      arc(0, 0, 60, 60, an * bomb + 0.1 + ang * i, an * bomb + 0.1 + ang * (i + 1));
    }
    for (i = yu; i < level; i++) {
      strokeWeight(1);
      stroke(255, 17, 44, 50);
      arc(0, 0, 60, 60, an * bomb + 0.1 + ang * i, an * bomb + 0.1 + ang * (i + 1));
    }

    rotate(this.angle);
    image(me[0], 0, 0, this.size0, this.size0);
    image(me[1], 0, 0, this.size, this.size);
    pop();
  }

  SeekParticle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    if (this.velocity.x <= 0) {
      this.angle -= this.velocity.mag() / this.size;
    } else {
      this.angle += this.velocity.mag() / this.size;
    }
    this.acceleration.mult(0);
    // this.life -= this.lifesub;
  }

}

SeekParticle.prototype = Object.create(Particle.prototype);
SeekParticle.constructor = SeekParticle;