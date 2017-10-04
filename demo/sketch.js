var target;
var seek;
var flock;
var RdmParticle;
var d = 25;

var level = 3;
var score = 0;
var over = false;
var blow = 0;
var timeScore = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  target = new TargetParticle(createVector(width / 2, height / 2));
  seek = new SeekParticle(createVector(random(width), random(height)));
  flock = new Flock();
  RdmParticle = new RandomParticleSystem();
}

function draw() {

  if (over === true) {
    background(0, 5);
    gameover();
  } else {
    background(0, 50);
    if (frameCount < 600) {
      push();
      noStroke();
      fill(255);
      text("Press ↑↓←→ to control the          dot", 50, 50);
      fill(255, 0, 0);
      text("RED", 197, 50);
      fill(255);
      text("Dodge                  triangles", 50, 70);
      fill(255, 255, 0);
      text("YELLOW", 90, 70);
      fill(255);
      text("Colloct               rectangles to blow triangles away", 50, 90);
      fill(0, 255, 0);
      text("GREEN", 90, 90);
      pop();
    }

    displayBoundaries();

    addFlock();
    addRandomParticle();


    target.applyForce(target.control());
    target.update();
    target.check();
    target.render();

    seek.applyForce(seek.seek(target.position));
    seek.update();
    seek.check();
    seek.render();

    if (blow == level) {
      flock.blowAway(seek.position);
      blow = 0;
    }

    flock.run(seek.position);
    RdmParticle.run(seek.position);

    scoreHandler();
  }
}


function displayBoundaries() {
  push();
  noFill();
  stroke(255);
  rect(d, d, width - d - d, height - d - d);
  pop();
}

function addFlock() {
  if (frameCount % 400 === 0) {
    flock.addBoids(createVector(0, 0));
  } else if (frameCount % 400 === 100) {
    flock.addBoids(createVector(width, 0));
  } else if (frameCount % 400 === 200) {
    flock.addBoids(createVector(width, height));
  } else if (frameCount % 400 === 300) {
    flock.addBoids(createVector(0, height));
  }
}

function addRandomParticle() {
  if (frameCount % 100 === 0) {
    RdmParticle.addParticle();
  }
}

function gameover() {
  push();
  rectMode(CENTER);
  fill(0, 100);
  stroke(255);
  rect(width / 2, height / 2, 200, 100, 5);
  fill(255);
  noStroke();
  text("Game Over!", width / 2 - 30, height / 2 - 20);
  text("Score:" + timeScore, width / 2 - 25, height / 2 + 20);
  pop();
}

function scoreHandler() {
  for (var i = 0; i < level; i++) {
    push();
    rectMode(CENTER);
    translate(5 * d + i * 20, d / 2);
    rotate(PI / 4);
    fill(255, 50);
    noStroke();
    rect(0, 0, 8, 8);
    pop();
  }

  for (var i = 0; i < score % level; i++) {
    push();
    rectMode(CENTER);
    translate(5 * d + i * 20, d / 2);
    rotate(PI / 4);
    fill(0, 255, 0);
    noStroke();
    rect(0, 0, 8, 8);
    pop();
  }
  push();
  fill(0, 255, 0);
  timeScore = round(millis() / 100) + score * 10;
  text("score: " + timeScore, 10 * d, d / 3 * 2)
  pop();
}