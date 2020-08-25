var FirstPersonMovement = pc.createScript('firstPersonMovement');

FirstPersonMovement.attributes.add('camera', {
    type: 'entity',
    description: 'Optional, assign a camera entity, otherwise one is created'
});

FirstPersonMovement.attributes.add('power', {
    type: 'number',
    default: 2500,
    description: 'Adjusts the speed of player movement'
});

FirstPersonMovement.attributes.add('lookSpeed', {
    type: 'number',
    default: 0.25,
    description: 'Adjusts the sensitivity of looking'
});

FirstPersonMovement.attributes.add('cameradistance', {
    type: 'number',
    default: 1, 
    max: 10,
    min: 0,
    description: 'Adjusts the distance of the camera in third person mode'
});
// initialize code called once per entity
FirstPersonMovement.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.eulers = new pc.Vec3();
    
    var app = this.app;
    
    // Listen for mouse move events
    app.mouse.on("mousemove", this._onMouseMove, this);

    // when the mouse is clicked hide the cursor
    app.mouse.on("mousedown", function () {
        app.mouse.enablePointerLock();
    }, this);            

    // Check for required components
    if (!this.entity.collision) {
        console.error("First Person Movement script needs to have a 'collision' component");
    }

    if (!this.entity.rigidbody || this.entity.rigidbody.type !== pc.BODYTYPE_DYNAMIC) {
        console.error("First Person Movement script needs to have a DYNAMIC 'rigidbody' component");
    }
    this.entity.collision.on('contact', this.onContact, this);
};

// update code called every frame
FirstPersonMovement.prototype.update = function(dt) {
    // If a camera isn't assigned from the Editor, create one
    if (!this.camera) {
        this._createCamera();
    }
    
    var force = this.force;
    var app = this.app;

    // console.log("this.camera.forward");
    // console.log(this.camera.forward);
    // console.log("this.camera.right");
    // console.log(this.camera.right);
    
    // Get camera directions to determine movement directions
    // var forward = this.camera.forward.scale(Math.sin(this.eulers.x));
    // var right = this.camera.right.scale(Math.cos(this.eulers.x));
    
    var forward = this.camera.forward;
    var right = this.camera.right;
    
//     console.log("forward");
//     console.log(forward);
//     console.log('right');
//     console.log(right);
    
//     console.log("this.entity.forward");
//     console.log(this.entity.forward);
//     console.log('this.entity.right');
//     console.log(this.entity.right);

    // movement
    var x = 0;
    var z = 0;

    // Use W-A-S-D keys to move player
    // Check for key presses
    if (app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_Q)) {
        x -= right.x; 
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
        
        // console.log("forward.x");
        // console.log(forward.x);
        // console.log("x");
        // console.log(x);
        // console.log("forward.z");
        // console.log(forward.z);
        // console.log("z");
        // console.log(z);
        
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }

    // use direction from keypresses to apply a force to the character
    if ((x !== 0 && z !== 0)) {
        force.set(x, 0, z).normalize().scale(this.power);
        this.entity.rigidbody.applyForce(force);
    }

    // update camera angle from mouse events
    this.entity.setLocalEulerAngles(0, this.eulers.x, 0);
    // this.camera.lookAt(this.entity.getPosition());
    this.camera.setLocalEulerAngles(this.eulers.y, this.eulers.x, 0);
    
    var camerapos = this.entity.forward.scale(-1);
    // console.log("camerapos");
    // console.log(camerapos);
    camerapos.y += 1;
    camerapos.scale(this.cameradistance);
    // console.log("camerapos");
    // console.log(camerapos);
    // if(this.entity.getLocalEulerAngles().x !== this.camera.getLocalEulerAngles().x && app.keyboard.isPressed(pc.KEY_W)){
    // this.camera.translateLocal(camerapos);
    // }
    // console.log("this.camera.getPosition()");
    // console.log(this.camera.getPosition());
};

FirstPersonMovement.prototype._onMouseMove = function (e) {
    // If pointer is disabled
    // If the left mouse button is down update the camera from mouse movement
    if (pc.Mouse.isPointerLocked() || e.buttons[0]) {
        this.eulers.x -= this.lookSpeed * e.dx;
        this.eulers.y -= this.lookSpeed * e.dy;
    }            
};

FirstPersonMovement.prototype._createCamera = function () {
    // If user hasn't assigned a camera, create a new one
    this.camera = new pc.Entity();
    this.camera.setName("First Person Camera");
    this.camera.addComponent("camera");
    this.entity.addChild(this.camera);
    var camerapos = new pc.Vec3(0 , 1, 1);
    camerapos.scale(this.cameradistance);
    this.camera.translateLocal(camerapos);
};

FirstPersonMovement.prototype.onContact = function(result) {

    var force = this.force;
    var app = this.app;
    var y = 0;

    if (app.keyboard.isPressed(pc.KEY_SPACE)){
        y += 1;
    }

    // use direction from keypresses to apply a force to the character
    if ( y !== 0) {
        force.set(0, y, 0).normalize().scale(10 * this.power);
        this.entity.rigidbody.applyForce(force);
    }
};