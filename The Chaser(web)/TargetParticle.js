var TargetParticle = function() {
  Particle.call(this, createVector(width / 2, height / 2));
  this.size = 10;
  this.control = function() {
    var f = createVector();
    if (keyIsDown(LEFT_ARROW)) {
      f.add(createVector(-0.5, 0));
    }

    if (keyIsDown(RIGHT_ARROW)) {
      f.add(createVector(0.5, 0));
    }

    if (keyIsDown(UP_ARROW)) {
      f.add(createVector(0, -0.5));
    }
    if (keyIsDown(DOWN_ARROW)) {
      f.add(createVector(0, 0.5));
    }
    return f;
    // var left_touch = createVector(left.x, left.y);
    // if (touches.length > 0) {
    //   for (var i = 0; i < touches.length; i++) {
    //     if (touches[i].x <= width / 2) {
    //       left_touch = createVector(touches[i].x, touches[i].y);
    //     } else if (touches[i].x > width / 2) {
    //       if (shot > 0 && click === false) {
    //         click = true;
    //         shot--;
    //         energy -= level;
    //     }
    //   }
    // }
    // push();
    // stroke(255, 50);
    // fill(255, 17, 44, 20);
    // image(btn[1], right.x, right.y, btn_size, btn_size);
    // image(btn[0], left.x, left.y, btn_size, btn_size);
    // pop();

    // var tx = map(left_touch.x - left.x, -btn_size, btn_size, -0.5, 0.5);
    // var ty = map(left_touch.y - left.y, -btn_size, btn_size, -0.5, 0.5);
    // var f = createVector(tx, ty);
    // return f;
  }

  this.update = function(f) {
    this.velocity.add(f);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.render = function() {
    noStroke();
    fill(0, 50);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}

TargetParticle.prototype = Object.create(Particle.prototype);
TargetParticle.constructor = TargetParticle;