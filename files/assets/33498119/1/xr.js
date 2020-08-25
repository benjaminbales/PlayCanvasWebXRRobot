var Xr = pc.createScript('xr');

// entity with button element
Xr.attributes.add('buttonVr', {
    type: 'entity'
});
Xr.attributes.add('buttonAr', {
    type: 'entity'
});

// entity with camera component
Xr.attributes.add('cameraEntity', {
    type: 'entity'
});

Xr.prototype.initialize = function() {
    this.buttonVr.button.active = this.app.xr.supported && this.app.xr.isAvailable(pc.XRTYPE_VR);
    this.buttonAr.button.active = this.app.xr.supported && this.app.xr.isAvailable(pc.XRTYPE_AR);
    
    this.clearColor = this.cameraEntity.camera.clearColor.clone();
    this.clearColorAR = new pc.Color(0, 0, 0, 0);
    
    // click button
    this.buttonVr.element.on('click', function() {
        // check support
        if (this.app.xr.isAvailable(pc.XRTYPE_VR)) {
            // start session
            this.cameraEntity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
        }
    }, this);
    
    this.buttonAr.element.on('click', function() {
        // check support
        if (this.app.xr.isAvailable(pc.XRTYPE_AR)) {
            // start session
            this.cameraEntity.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
        }
    }, this);
    
    this.app.keyboard.on('keydown', function(evt) {
        if (evt.key === pc.KEY_ESCAPE) {
            this.app.xr.end();
        }
    }, this);
    
    this.app.xr.on('start', function() {
        this.buttonVr.enabled = false;
        this.buttonAr.enabled = false;
        
        if (this.app.xr.type === pc.XRTYPE_AR) {
            this.cameraEntity.camera.clearColor = this.clearColorAR;
            this.app.scene.root.findByTag('nonAr').forEach(function(e) {
                e.model.enabled = false;
            });
        }
    }, this);
    
    this.app.xr.on('end', function() {
        this.buttonVr.enabled = true;
        this.buttonAr.enabled = true;
        
        this.cameraEntity.camera.clearColor = this.clearColor;
        this.app.scene.root.findByTag('nonAr').forEach(function(e) {
            e.model.enabled = true;
        });
    }, this);
    
    this.app.xr.on('available', function() {
        this.buttonVr.button.active = this.app.xr.supported && this.app.xr.isAvailable(pc.XRTYPE_VR);
        this.buttonAr.button.active = this.app.xr.supported && this.app.xr.isAvailable(pc.XRTYPE_AR);
    }, this);
};
