var Controllers = pc.createScript('controllers');

Controllers.attributes.add('controllerTemplate', {
    type: 'entity'
});

Controllers.prototype.initialize = function() {
    this.app.xr.input.on('add', this.onAdd, this);
};

Controllers.prototype.onAdd = function(inputSource) {
    var entity = this.controllerTemplate.clone();
    entity.script.controller.inputSource = inputSource;
    entity.reparent(this.app.scene.root);
    entity.enabled = true;
};