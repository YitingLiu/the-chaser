var SeekParticle = function(position) {
    Particle.call(this, position);
    this.maxspeed = 3;

    SeekParticle.prototype.seek = function(target) {
        var desired = p5.Vector.sub(target, this.position);
        var steer=p5.Vector.sub(desired,this.velocity);
        return steer;
    }


}

SeekParticle.prototype = Object.create(Particle.prototype);
SeekParticle.constructor = SeekParticle;