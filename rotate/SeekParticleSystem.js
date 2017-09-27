var SeekParticleSystem = function() {
  this.particles = [];

  this.addParticle = function(seek) {
    this.particles.push(new Particle(seek.position));
  };

  this.run = function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
      p.check();
      p.render();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };
}