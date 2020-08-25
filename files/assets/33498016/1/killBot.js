var KillBot = pc.createScript('killBot');

// initialize code called once per entity
KillBot.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
KillBot.prototype.update = function(dt) {
    
};

KillBot.prototype.onTriggerEnter = function(otherEntity){
    console.log("otherEntity");
    console.log(otherEntity);
};