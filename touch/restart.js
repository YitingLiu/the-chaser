function restart() {
  energy = 0;
  bomb = 0;
  gameTime = 0;
  over = false;
  blow = 0;
  click = false;
  score = 0;
  allenergy=0;
  target = new TargetParticle(createVector(width / 2, height / 2));
  seek = new SeekParticle(createVector(random(width), random(height)));
  flock = new Flock();
  RdmParticle = new RandomParticleSystem();
  bomb = floor(energy / level);
  removeElements();
}