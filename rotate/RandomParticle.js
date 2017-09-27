var RandomParticle = function() {
  Particle.call(this, createVector(random(d, width - d), random(d, height - d)));
  this.offset = createVector(random(1000), random(1000, 2000), random(2000, 3000));
  this.addition = createVector(0.001, 0.001, 0.01);
  this.size = random(4, 12);

  this.update = function() {
    this.position.x = map(noise(this.offset.x), 0, 1, 0, width);
    this.position.y = map(noise(this.offset.y), 0, 1, 0, height);
    this.offset.add(this.addition);
  }

  this.render = function() {
    // push();
    // noStroke();
    // fill(0, 255, 0);
    // var verti = 30; // number of curveVertex per ring
    // var angle = TWO_PI / verti;
    // for (var j = 0; j < 8; j++) {
    //   beginShape();
    //   for (var i = 0; i < verti; i++) {
    //     var r = map(noise(this.off + i), 0, 1, -1, 1) * j;
    //     var x = this.position.x + cos(angle * i) * (j * 1.5 + r);
    //     var y = this.position.y + sin(angle * i) * (j * 1.5 + r);
    //     curveVertex(x, y);
    //   }
    //   endShape(CLOSE);
    //   pop();
    //   this.off += 0.01;
    // }

    push();
    fill(0, 255, 0);
    translate(this.position.x, this.position.y);
    var angle = map(noise(this.offset.z), 0, 1, 0, TWO_PI);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size, 2);
    pop();
  }

  this.isDead = function(tar) {
    var dis = p5.Vector.dist(this.position, tar);
    if (dis < this.size + 2) {
      return true;
    } else {
      return false;
    }
  }

}

RandomParticle.prototype = Object.create(Particle.prototype);
RandomParticle.constructor = RandomParticle;