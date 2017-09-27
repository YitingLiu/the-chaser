var RandomParticleSystem = function() {
  this.RdmParticles = [];


  this.run = function(tar) {
    for (var i = 0; i < this.RdmParticles.length; i++) {
      if (this.RdmParticles[i].isDead(tar) === true) {
        score++;
        blow++;
        this.RdmParticles.splice(i, 1);
      } else {
        this.RdmParticles[i].update();
        this.RdmParticles[i].check();
        this.RdmParticles[i].render();
      }
    }


  }

  this.addParticle = function() {
    this.RdmParticles.push(new RandomParticle());
  }

}