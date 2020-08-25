var Staircase = pc.createScript('staircase');

Staircase.attributes.add('spawntime', {
    type: 'number',
    min: 0.1, 
    max: 5,
    default: 1
});

Staircase.attributes.add('step', {
    type: 'entity',    
});

var stairlist = [];
var idx = 0;
var cycle = 0;
var pos;
var offset = 0;
var spawntimer = 0;
var boxCount = 0;

// initialize code called once per entity
Staircase.prototype.initialize = function() {
    pos = this.step.getPosition();
    offset = this.step.script.stepAnimation.height;
};

// update code called every frame
Staircase.prototype.update = function(dt) {
    
    spawntimer += dt;
    this.spawn(spawntimer);
};

Staircase.prototype.spawn = function(tmr){
    if(tmr >= this.spawntime && boxCount < 224){
        
        var e = this.step.clone();
        e.enabled = true;
        this.app.root.addChild(e);
        
        // console.log("e.collision");
        // console.log(e.collision);
        // console.log("e.rigidbody");
        // console.log(e.rigidbody);
        
        // console.log("e");
        // console.log(e);
                
        switch(cycle){
            case 0:
                pos.x -= 1;
                break;
            case 1:
                pos.z -= 1;
                break;
            case 2:
                pos.x += 1;
                break;
            case 3:
                pos.z += 1;
                break;
        }
        
        pos.y = offset + (0.05 * boxCount);
        e.setPosition(pos);
        boxCount++;
        idx++;
        spawntimer = 0;
        if(idx > 13){
            cycle = (cycle + 1) % 4;
            idx = 0;
        }
    }
};