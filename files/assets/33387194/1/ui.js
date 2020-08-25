var Ui = pc.createScript('ui');

Ui.attributes.add('html', {
    type: 'asset',
    assetType: 'html'
});

Ui.attributes.add('css', {
    type: 'asset',
    assetType: 'css'
});

// initialize code called once per entity
Ui.prototype.initialize = function() {
    var div = document.createElement("div");
    div.id = "ui";
    div.innerHTML = this.html.resource;
    document.body.appendChild(div);
    
    // console.log("style");
    // console.log(style);

    style = pc.createStyle(this.css.resource);
    document.head.appendChild(style);
};