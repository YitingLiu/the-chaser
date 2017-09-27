var RandomParticleSystem = function() {
  this.RdmParticles = [];


  this.run = function(tar,s) {
    for (var i = 0; i < this.RdmParticles.length; i++) {
      if (this.RdmParticles[i].isDead(tar,s) === true) {
        energy++;
        bomb = floor(energy / level);
        this.RdmParticles.splice(i, 1);
      } else {
        this.RdmParticles[i].attract(tar,s);
        this.RdmParticles[i].update();
        this.RdmParticles[i].check();
        this.RdmParticles[i].render(tar);
      }
    }
  }

  this.addParticle = function() {
    this.RdmParticles.push(new RandomParticle());
  }
}