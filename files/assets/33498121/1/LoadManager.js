var LoadManager = pc.createScript('loadManager');

LoadManager.attributes.add('startbtn', {
   type: 'entity',
});

LoadManager.attributes.add('levelselectbtn', {
   type: 'entity',
});

LoadManager.attributes.add('tutorialbtn', {
   type: 'entity',
});

LoadManager.attributes.add('quitbtn', {
   type: 'entity',
});

// initialize code called once per entity
LoadManager.prototype.initialize = function() {
    this.startbtn.button.on('click', this.start, this);
    this.levelselectbtn.button.on('click', this.levelselect, this);
    this.tutorialbtn.button.on('click', this.tutorial, this);
    this.quitbtn.button.on('click', this.quit, this);
};

// update code called every frame
LoadManager.prototype.update = function(dt) {
    
};

LoadManager.prototype.start = function(evt){
    
//     console.log("evt");
//     console.log(evt);
//     console.log("this.app.scenes");
//     console.log(this.app.scenes);
    
//     var levelone = this.app.scenes.find('Level One');
//     var mainmenu = this.app.scenes.find('Main Menu');
//     console.log("mainmenu.name");
//     console.log(mainmenu.name);
    
//     // console.log("this.app.scene.name");
//     // console.log(this.app.scene.name);
//     console.log(this.app.scenes);
//     this.app.scenes.loadScene(levelone.url);
//     this.app.scenes.remove(mainmenu.name);
//     console.log(this.app.scenes);
    
    // Get a reference to the scene's root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Get the path to the scene
    var scene = this.app.scenes.find('Level One');
    
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

LoadManager.prototype.levelselect = function(evt){
    console.log("evt");
    console.log(evt);
};

LoadManager.prototype.tutorial = function(evt){
    console.log("evt");
    console.log(evt);
};

LoadManager.prototype.quit = function(evt){
    console.log("evt");
    console.log(evt);
    this.app.destroy();
};