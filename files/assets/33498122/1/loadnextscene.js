var Loadnextscene = pc.createScript('loadnextscene');

Loadnextscene.attributes.add('nextbtn', {
   type: 'entity',
});

// initialize code called once per entity
Loadnextscene.prototype.initialize = function() {
    this.nextbtn.button.on('click', this.loadNextScene, this);
};

// update code called every frame
Loadnextscene.prototype.update = function(dt) {
    
};

Loadnextscene.prototype.loadNextScene = function(evt){
    
    // Get a reference to the scene's root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Get the path to the scene
    var scene = this.app.scenes.find('Main Menu');
    
    // Load the scenes entity hierarchy
    this.app.scenes.loadScene(scene.url, function (err, scene) {
        if (!err) {
            oldHierarchy.destroy();
            pc.ComponentSystem.initialize(scene.root);
            pc.ComponentSystem.postInitialize(scene.root);
        } else {
            console.error(err);
        }
    });
};