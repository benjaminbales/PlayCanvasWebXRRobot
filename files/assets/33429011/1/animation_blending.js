var AnimationBlending = pc.createScript('animationBlending');

AnimationBlending.states = {
    idle: { 
        animation: 'Playbot_idle' 
    },
    run: { 
        animation: 'Playbot_run' 
    },
    runreverse: { 
        animation: 'Playbot_run' 
    },
    jump: {
        animation: 'Playbot_jump'
    },
    die: {
        animation: 'Playbot_die'
    }
};

// initialize code called once per entity
AnimationBlending.prototype.initialize = function() {
    this.blendTime = 0.2;

    this.setState('idle');

    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
};

AnimationBlending.prototype.setState = function (state) {
    var states = AnimationBlending.states;
    
    this.state = state;

    // Set the current animation, taking 0.2 seconds to blend from
    // the current animation state to the start of the target animation.
    if(this.state === 'runreverse'){
        this.entity.animation.play(states[state].animation, this.blendTime);
        this.entity.animation.speed = -0.5;
        console.log('runreverse');
    }else{
        this.entity.animation.play(states[state].animation, this.blendTime);
        this.entity.animation.speed = 0.5;
    }
};

AnimationBlending.prototype.keyDown = function (e) {
    
    if ((e.key === pc.KEY_W) && (this.state !== 'run')) {
        this.setState('run');
    }
    
    if ((e.key === pc.KEY_S) && (this.state !== 'run')) {
        this.setState('runreverse'); 
    }
    
        if ((e.key === pc.KEY_A) && (this.state !== 'run')) {
        this.setState('run');
    }
    
    if ((e.key === pc.KEY_D) && (this.state !== 'run')) {
        this.setState('run');
    }
    
    if ((e.key === pc.KEY_SPACE) && (this.state !== 'jump')) {
        this.setState('jump');
    }
    
};

AnimationBlending.prototype.keyUp = function (e) {
        this.setState('idle');
};
