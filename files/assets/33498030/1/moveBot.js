var MoveBot = pc.createScript('moveBot');

MoveBot.attributes.add('power', {
    type: 'number',
    default: 1500,
    min: 0, 
    max: 5000,
    description: 'set the force driving the lift and rotation of the robot'
});

var tmr = 0;
var lifttime = 0.5;
var force = new pc.Vec3();
// initialize code called once per entity
MoveBot.prototype.initialize = function() {
     this.app.xr.input.on('selectstart', this.onSelectStart, this);
};

// update code called every frame
MoveBot.prototype.update = function(dt) {
    // tmr += (32 * dt);
    // if(tmr > lifttime){
    // this.entity.rigidbody.applyForce(new pc.Vec3(0, 10000, 0));
    // force.x = Math.cos(tmr/(2 * Math.PI));
    // force.y = Math.abs(Math.cos(tmr/(2 * Math.PI)));
    // force.z = Math.sin(tmr/(2 * Math.PI));
    // this.entity.rigidbody.applyForce(force.scale(this.power));
        // tmr = 0;
        // console.log('hello world');
    // }
};

MoveBot.prototype.onSelectStart = function(src, evt){
    console.log("src");
    console.log(src);
    console.log("evt");
    console.log(evt);
    this.entity.rigidbody.applyForce(new pc.Vec3(0, this.power * 10, 0));
    // if(this.entity.sound !== null) this.entity.sound.play('swoosh');
};