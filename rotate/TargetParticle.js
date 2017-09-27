var TargetParticle = function() {
  Particle.call(this, createVector(width / 2, height / 2));


  this.control = function() {
    var rx=map(rotationX,-60,60,-0.5,0.5);
    var ry=map(rotationY,-60,60,-0.5,0.5);
    var f = createVector(ry,rx);
    // if (keyIsDown(LEFT_ARROW)) {
    //   f.add(createVector(-0.5, 0));
    // }

    // if (keyIsDown(RIGHT_ARROW)) {
    //   f.add(createVector(0.5, 0));
    // }

    // if (keyIsDown(UP_ARROW)) {
    //   f.add(createVector(0, -0.5));
    // }
    // if (keyIsDown(DOWN_ARROW)) {
    //   f.add(createVector(0, 0.5));
    // }
    return f;
  }

  this.render = function() {
    noStroke();
    fill(255, 50);
    ellipse(this.position.x, this.position.y, 10, 10);
  }


}

TargetParticle.prototype = Object.create(Particle.prototype);
TargetParticle.constructor = TargetParticle;