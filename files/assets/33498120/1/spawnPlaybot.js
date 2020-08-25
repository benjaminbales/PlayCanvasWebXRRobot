var SpawnPlaybot = pc.createScript('spawnPlaybot');

SpawnPlaybot.attributes.add('Playbot', {
    type:'entity',
    description: 'model to spawn that attacks the camera'
});

SpawnPlaybot.attributes.add('spawntimer', {
    type: 'number',
    default: 1, 
    min: 0.1,
    max: 5,
    description: 'time in second between Playbot spawns'
});

var tmr = 0;
// initialize code called once per entity
// SpawnPlaybot.prototype.initialize = function() {
//     this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
// };

// update code called every frame
SpawnPlaybot.prototype.update = function(dt) {
    tmr += dt;
    if(tmr > this.spawntimer){
        // console.log("tmr");
        // console.log(tmr);
        // console.log("this.spawntimer");
        // console.log(this.spawntimer);
        var e = this.Playbot.clone();
        e.setPosition(new pc.Vec3(0, 1, -3.5));
        e.enabled = true;
        this.app.root.addChild(e);
        tmr = 0;
    }
};

// SpawnPlaybot.prototype.onTriggerEnter = function(otherEntity){
//     console.log("otherEntity");
//     console.log(otherEntity);
// };