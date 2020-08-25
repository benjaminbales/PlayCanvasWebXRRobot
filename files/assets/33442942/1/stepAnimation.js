var StepAnimation = pc.createScript('stepAnimation');

StepAnimation.attributes.add('height', {
    type: 'number',
    default: 1
});

StepAnimation.attributes.add('speed', {
    type: 'number',
    default: 1,
    min: 0.01,
    max: 5
});

// initialize code called once per entity
StepAnimation.prototype.initialize = function() {
};

// update code called every frame
StepAnimation.prototype.update = function(dt) {
    if(this.height / this.speed > 0){
        var pos = this.entity.getPosition();
        pos.y -= this.speed * dt;
        this.entity.setPosition(pos);
        this.height -= this.speed * dt;
    }
};