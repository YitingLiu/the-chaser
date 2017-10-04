var TargetParticle = function() {
  Particle.call(this, createVector(width / 2, height / 2));
  this.size = 10;
  this.control = function() {
    // var f = createVector();
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
    // return f;
    var left_touch = createVector(left.x, left.y);
    var left_image=0;
    var right_image=0;
    var button_position=createVector(left.x, left.y);
    var f=createVector(0,0);
    if (touches.length > 0) {
      for (var i = 0; i < touches.length; i++) {
        if (touches[i].x <= width / 2) {
          left_touch = createVector(touches[i].x, touches[i].y);
          left_image=1;
          f=p5.Vector.sub(left_touch, left);
          var m=map(f.mag(), -200, 200, -btn_size/2,btn_size/2);
          f.setMag(m);
          button_position.add(f);
          f.mult(10);
        } else if (dist(right.x,right.y,touches[i].x,touches[i].y)<btn_size*1.5) {
          if (bomb > 0 && click === false) {
            right_image=1;
            click = true;
            bomb--;
            energy -= level;
          }
        }
      }
    }
    push();
    stroke(255, 50);
    fill(255, 17, 44, 20);
    image(btn[2],button_position.x,button_position.y,btn_center_size,btn_center_size);
    image(btn[right_image], right.x, right.y, btn_size, btn_size);
    image(btn[left_image], left.x, left.y, btn_size, btn_size);
    pop();

    return f;
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