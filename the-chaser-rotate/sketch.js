var target;
var seek;
// var seekps;
var flock;
var RdmParticle;
// var d = 0;

var full = 8;
var level = 1;
var energy = 0;
var allenergy=0;
var bomb = 0;
var over = false;
var blowTime = 0;
var click = false;
var score = 0;
var highscore = 0;
var gameTime = 0;
var restartShow =false;

var em = [];
var eg = [];
var me = [];





function preload() {
  em[0] = loadImage('images/em_shadow.png');
  em[1] = loadImage('images/em1.png');
  em[2] = loadImage('images/em2.png');
  em[3] = loadImage('images/em3.png');
  em[4] = loadImage('images/em4.png');
  em[5] = loadImage('images/em5.png');
  em[6] = loadImage('images/em6.png');
  eg[0] = loadImage('images/eg_shadow.png');
  eg[1] = loadImage('images/eg1.png');
  eg[2] = loadImage('images/eg2.png');
  eg[3] = loadImage('images/eg3.png');
  eg[4] = loadImage('images/eg4.png');
  eg[5] = loadImage('images/eg5.png');
  eg[6] = loadImage('images/eg6.png');
  me[0] = loadImage('images/red_shadow.png');
  me[1] = loadImage('images/red.png');

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  imageMode(CENTER);
  target = new TargetParticle(createVector(width / 2, height / 2));
  seek = new SeekParticle(createVector(random(width), random(height)));
  // seekps = new SeekParticleSystem();
  flock = new Flock();
  RdmParticle = new RandomParticleSystem();
  bomb = floor(energy / level);
}

function draw() {
  if (over === true) {
    gameover();
  } else {
    background("#fff3e0");
    // displayBoundaries();

    addFlock();
    addRandomParticle();


    // target.applyForce(target.control());


    target.update(target.control());
    target.check();
    target.render();

    seek.applyForce(seek.seek(target.position));
    seek.update();
    seek.check();
    seek.render();

    // seekps.addParticle(seek);
    // seekps.run();


    if (click && blowTime === 0) {
      blowTime++;
    }

    if (blowTime < 20 && blowTime > 0) {
      blowTime += 2;
      push();
      noFill();
      stroke(255, 17, 44);
      ellipse(seek.position.x, seek.position.y, blowTime * 100, blowTime * 100);
      pop();
      flock.blowAway(seek.position);
    }

    if (blowTime > 20) {
      blowTime = 0;
      click = false;
    }

    flock.run(seek.position,seek.size);
    RdmParticle.run(seek.position,seek.size);

    scoreHandler();
  }
}

// function displayBoundaries() {
//   push();
//   noFill();
//   stroke(255);
//   rect(d, d, width - d - d, height - d - d);
//   pop();
// }

function addFlock() {
  if (frameCount % 400 === 0) {
    flock.addBoids(createVector(random(width), 0)); // top
  } else if (frameCount % 400 === 100) {
    flock.addBoids(createVector(width, random(height))); // right
  } else if (frameCount % 400 === 200) {
    flock.addBoids(createVector(random(width), height)); //bottom
  } else if (frameCount % 400 === 300) {
    flock.addBoids(createVector(0, random(height))); //left
  }
}

function addRandomParticle() {
  if (frameCount % 100 === 0) {
    RdmParticle.addParticle();
  }
}

function gameover() {
  if(restartShow===false) {
    restartShow=true;
    background(255, 243, 224, 50);
    if (score > highscore) {
      highscore = score;
    }
    push();
    rectMode(CENTER);
    fill(61);
    noStroke();
    rect(width / 2, height / 2, 300, 180, 5);
    fill("#FFF3E0");
    textAlign(CENTER);
    textSize(24);
    text("Game Over!", width / 2, height / 2 - 40);
    textSize(18);
    text("Score:" + score, width / 2, height / 2);
    text("Highest Score:" + highscore, width / 2, height / 2 + 20);
    pop();

    var btn_again = createButton("AGAIN");
    btn_again.position(width / 2 - 60, height / 2 + 40)
    btn_again.touchStarted(restart);
  }
}

function scoreHandler() {
  gameTime++;
  if(allenergy<energy){
    allenergy=energy;
  }

  push();
  fill(61);
  score = round(gameTime / 60) + allenergy * 10;
  textSize(18);
  text("score: " + score, width - 100, 20)
  pop();
}

function keyPressed() {
  if (keyCode == SHIFT) {
    if (bomb > 0 && click === false) {
      click = true;
      bomb--;
      energy -= level;
    }
  }
  return false;
}

function touchStarted() {
  return false;
}

function restart() {
  energy = 0;
  bomb = 0;
  gameTime = 0;
  allenergy=0
  over = false;
  blow = 0;
  click = false;
  score = 0;
  restartShow=false;
  target = new TargetParticle(createVector(width / 2, height / 2));
  seek = new SeekParticle(createVector(random(width), random(height)));
  flock = new Flock();
  RdmParticle = new RandomParticleSystem();
  bomb = floor(energy / level);
  removeElements();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}