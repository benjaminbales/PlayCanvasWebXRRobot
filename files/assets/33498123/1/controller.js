var Controller = pc.createScript('controller');

Controller.prototype.initialize = function() {
    this.ray = new pc.Ray();
    this.vecA = new pc.Vec3();
    this.vecB = new pc.Vec3();
    this.matA = new pc.Mat4();
    this.quat = new pc.Quat();
    this.color = new pc.Color(1, 1, 1);
    
    this.inputSource.once('remove', function() {
        this.entity.destroy();
    }, this);
};

Controller.prototype.update = function(dt) {
    // render ray line
    this.vecA.copy(this.inputSource.getOrigin());
    this.vecB.copy(this.inputSource.getDirection());
    this.vecB.scale(1000).add(this.vecA);
    
    if (this.inputSource.selecting) {
        this.color.set(1, 0.375, 0);
    } else {
        this.color.set(1, 1, 1);
    }

    this.app.renderLine(this.vecA, this.vecB, this.color);

    // grip
    if (this.inputSource.grip) {
        this.entity.model.enabled = true;
        this.entity.setPosition(this.inputSource.getPosition());
        this.entity.setRotation(this.inputSource.getRotation());
    } else {
        this.entity.model.enabled = false;
        this.entity.setLocalPosition(0, 0, 0);
        
        this.vecA.set(0, 0, 0);
        this.vecB.set(0, 1, 0);
        this.matA.setLookAt(this.vecA, this.inputSource.getDirection(), this.vecB);
        this.quat.setFromMat4(this.matA);
        this.entity.setRotation(this.quat);
    }
};
