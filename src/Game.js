BasicGame.Game = function(game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //	the tween manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator

    // environment
    this.clouds;
    this.cloudsTiled;
    this.cloudsTween;
    this.skyline;
    this.skylineTiled;
    this.skylineTween;
    this.houses;
    this.housesTiled;
    this.housesTween;
    this.road;
    this.roadTiled;
    this.roadTween;

    // startup
    this.startHelpText;
    this.startButton;

    // scores
    this.mosqueScore;
    this.flyingmuslimScore;
    this.flyScore;
    this.crimineelScore;

    // sounds
    this.trafficSound;
    this.mosqueSound;
    this.baseballbatSound;
    this.muslimSound;
    this.sireneSound;
    this.beepSound;
    this.applauseSound;

    // mosque
    this.mosque;
    this.mosqueHit;
    this.mosqueHitCount;
    this.mPosition;
    this.randMosqueAmplitude;

    // flying muslim
    this.muslim;
    this.flyingmuslim;
    this.flyingcarpet;
    this.fPosition;
    this.flyingmuslimHit;
    this.flyingmuslimAlmostHit;
    this.flyingmuslimHitCount;
    this.randMuslimAmplitude;

    // fly
    this.flyShit;
    this.flyHit;
    this.flyAlmostHit;
    this.randFlyAmplitude;
    this.flyPosition;
    this.currentFly;
    this.defaultFlyX;
    this.defaultFlyXDirection;
    this.defaultFlyY;
    this.defaultFlyMoveX;
    this.defaultFlyKillX;
    this.defaultFlyDirection;
    this.flyHitCount;

    // criminal
    this.crimineel;
    this.crimineelHit;
    this.crimineelAlmostHit;
    this.crimineelHitCount;

    // tools
    this.baseballbat;
    this.bPosition;
    this.killfly;
    this.kPosition;
    this.politiewagen;

    // general
    this.countDown;
    this.timeCounter;
    this.seconds;
    this.isLoaded;
    this.isRunning;
    this.filipenkarolien;

};

BasicGame.Game.prototype = {

    create: function() {

        // define default variables
        this.countDown = 30;
        this.isLoaded = false;
        this.isRunning = false;
        this.mosqueHit = false;
        this.mosqueAlmostHit = false;
        this.mosqueHitCount = 0;
        this.mPosition = 0.0;
        this.randMosqueAmplitude = 20;
        this.flyingmuslimHit = false;
        this.flyingmuslimAlmostHit = false;
        this.flyingmuslimHitCount = 0;
        this.bPosition = 0.0;
        this.fPosition = 0.0;
        this.randMuslimAmplitude = 20;
        this.flyHit = false;
        this.flyAlmostHit = false;
        this.flyHitCount = 0;
        this.currentFly = 'Elio';
        this.defaultFlyX = 950;
        this.defaultFlyXDirection = -230;
        this.defaultFlyY = 100;
        this.defaultFlyMoveX = -4;
        this.defaultFlyKillX = -8;
        this.defaultFlyDirection = '<';
        this.kPosition = 0.0;
        this.flyPosition = 0.0;
        this.randFlyAmplitude = 20;
        this.crimineelHit = false;
        this.crimineelAlmostHit = false;
        this.crimineelHitCount = 0;

        // load sounds
        this.trafficSound = this.add.audio('trafficsound', 0.2, true);
        this.mosqueSound = this.add.audio('mosquesound', 0.2, false);
        this.baseballbatSound = this.add.audio('baseballbatsound', 1, false);
        this.muslimSound = this.add.audio('muslimsound', 1, false);
        this.sireneSound = this.add.audio('sirene', 0.3, false);
        this.beepSound = this.add.audio('beep', 0.6, false);
        this.applauseSound = this.add.audio('applause', 0.7, false);

        // define game items
        this.add.sprite(0, 0, 'sky');
        this.clouds = this.add.sprite(0, -300, 'clouds2');
        this.cloudsTiled = this.add.tileSprite(0, -300, 1024, 512, 'clouds2');
        this.skyline = this.add.sprite(0, 600, 'skyline');
        this.skylineTiled = this.add.tileSprite(0, 600, 1600, 800, 'skyline');
        this.mosque = this.add.sprite(864, 200, 'mosque');
        this.mosque.anchor.x = 0.5;
        this.mosque.anchor.y = 0;
        this.mosque.inputEnabled = true;
        this.mosque.events.onInputDown.add(this.changeMosque, this);
        this.houses = this.add.sprite(0, 600, 'houses');
        this.housesTiled = this.add.tileSprite(0, 600, 1600, 800, 'houses');
        this.road = this.add.sprite(0, 600, 'road');
        this.roadTiled = this.add.tileSprite(0, 600, 1600, 800, 'road');

        this.cloudsTween = this.add.tween(this.clouds).to({
            y: -50
        }, 2400, Phaser.Easing.Linear.In, true, 0, false);
        this.cloudsTween.onComplete.add(this.cloadsLoaded, this);
        this.skylineTween = this.add.tween(this.skyline).to({
            y: -40
        }, 2400, Phaser.Easing.Linear.In, true, 250, false);
        this.skylineTween.onComplete.add(this.skylineLoaded, this);
        this.housesTween = this.add.tween(this.houses).to({
            y: 0
        }, 2400, Phaser.Easing.Linear.In, true, 125, false);
        this.housesTween.onComplete.add(this.housesLoaded, this);
        this.roadTween = this.add.tween(this.road).to({
            y: 145
        }, 2400, Phaser.Easing.Linear.In, true, 0, false);
        this.roadTween.onComplete.add(this.roadLoaded, this);

        this.flyingmuslim = this.add.group();
        this.flyingcarpet = this.flyingmuslim.create(100, 100, 'flyingcarpet');
        this.flyingcarpet.anchor.x = 0.5;
        this.flyingcarpet.anchor.y = 0.5;
        this.flyingcarpet.x = 100;
        this.flyingcarpet.y = 140;
        this.flyingcarpet.inputEnabled = true;
        this.muslim = this.flyingmuslim.create(100, 100, 'muslim');
        this.muslim.anchor.x = 0.5;
        this.muslim.anchor.y = 0.5;
        this.muslim.x = 100;
        this.muslim.y = 100;
        this.muslim.inputEnabled = true;
        this.muslim.animations.add('run');
        this.muslim.animations.play('run', 10, true);
        this.flyingmuslim.x = -170;
        this.flyingmuslim.y = 180;
        this.muslim.events.onInputDown.add(this.changeMuslim, this);

        this.flyShit = this.add.sprite(this.defaultFlyX, this.defaultFlyY, 'fly_elio');
        this.flyShit.anchor.x = 0.5;
        this.flyShit.anchor.y = 0;
        this.flyShit.animations.add('run2');
        this.flyShit.animations.play('run2', 10, true);
        this.flyShit.inputEnabled = true;
        this.flyShit.events.onInputDown.add(this.changeFly, this);

        this.crimineel = this.add.sprite(1000, 520, 'crimineel');
        this.crimineel.anchor.x = 0;
        this.crimineel.anchor.y = 1;
        this.crimineel.scale.x = this.crimineel.scale.y = 0.6;
        this.crimineel.animations.add('run3');
        this.crimineel.animations.play('run3', 10, true);
        this.crimineel.inputEnabled = true;
        this.crimineel.events.onInputDown.add(this.changeCrimineel, this);

        this.politiewagen = this.add.sprite(820, 540, 'politiewagen');
        this.politiewagen.anchor.x = 0;
        this.politiewagen.anchor.y = 1;
        this.politiewagen.animations.add('run4');
        this.politiewagen.animations.play('run4', 10, true);

        this.baseballbat = this.add.sprite(0, 0, 'baseballbat');
        this.baseballbat.anchor.y = 1;
        this.baseballbat.x = -400;
        this.baseballbat.y = 1500;
        this.baseballbat.angle = 20;

        this.killfly = this.add.sprite(0, 0, 'killfly');
        this.killfly.anchor.y = 1;
        this.killfly.anchor.x = 1;
        this.killfly.x = 790;
        this.killfly.y = 1200;
        this.killfly.angle = 10;

    },

    render: function() {
        if (this.isLoaded && this.isRunning) {
            this.seconds = Math.ceil(this.time.events.duration / 1000);
            if (this.seconds < 11) {
                if (!this.beepSound.isPlaying) this.beepSound.play();
                if (this.seconds % 2) {
                    this.timeCounter.setStyle({
                        font: '105px arial',
                        weight: 'bold',
                        fill: '#ffffff',
                        align: 'right',
                        stroke: "#FF0000",
                        strokeThickness: 8
                    });
                } else {
                    this.timeCounter.setStyle({
                        font: '105px arial',
                        weight: 'bold',
                        fill: '#ff0000',
                        align: 'right',
                        stroke: "#FFffff",
                        strokeThickness: 8
                    });
                }
            }
            this.timeCounter.setText(this.seconds);
        }
    },

    update: function() {

        if (this.isLoaded && this.isRunning) {

            // mosque
            if (this.mosque.x < -64) {
                this.mosque.x = 864;
                this.mosque.loadTexture('mosque');
                this.mosqueHit = false;
                if (!this.mosqueSound.isPlaying) this.mosqueSound.play();
            }
            if (this.mosqueHit) {
                this.mosque.x -= 4;
            } else {
                this.mosque.x -= 8;
            }
            if (!this.mosqueHit) {
                if (this.mPosition >= 40) {
                    this.mPosition = 0.0;
                    this.randMosqueAmplitude = this.rnd.integerInRange(10, 60);
                }
                this.mosque.y = 230.0 + (this.randMosqueAmplitude * (Math.sin((2 * Math.PI * this.mPosition) / 40)));
                this.mPosition += 1;
            } else {
                this.mosque.y += 0.9;
                if (this.mosque.position.x < 200) {}
            }

            // flying muslim
            if (this.flyingmuslimAlmostHit) {
                this.baseballbat.x = -200;
                this.baseballbat.angle -= 3;
                this.baseballbat.scale.x -= 0.03;
                this.baseballbat.scale.y -= 0.024;
                if (this.baseballbat.angle < -20) {
                    this.flyingmuslimHit = true;
                    if (!this.muslimSound.isPlaying) this.muslimSound.play();
                }
                if (this.baseballbat.angle < -100) {
                    this.flyingmuslimAlmostHit = false;
                }
            } else {
                this.baseballbat.x = -400;
                if (this.bPosition >= 60) this.bPosition = 0.0;
                this.baseballbat.y = 900.0 + (10 * (Math.sin((2 * Math.PI * this.bPosition) / 60)));
                this.bPosition += 1;
            }
            if (this.flyingmuslim.x > 800) {
                this.flyingmuslim.x = -170;
                this.flyingmuslimAlmostHit = false;
                this.flyingmuslimHit = false;
                this.muslim.x = 100;
                this.muslim.y = 100;
                this.muslim.angle = 0;
                this.baseballbat.angle = 20;
                this.baseballbat.scale.x = this.baseballbat.scale.y = 1;
                this.baseballbat.x = -400;
                if (this.flyingmuslimHit) {
                    this.baseballbat.y = 900;
                }
            }
            if (this.flyingmuslimHit) {
                this.flyingmuslim.x += 8;
                this.muslim.x -= 5;
            } else {
                this.flyingmuslim.x += 4;
            }
            if (!this.flyingmuslimHit) {
                if (this.fPosition >= 80) {
                    this.fPosition = 0.0;
                    this.randMuslimAmplitude = this.rnd.integerInRange(10, 200);
                }
                this.flyingmuslim.y = 130.0 + (this.randMuslimAmplitude * (Math.sin((2 * Math.PI * this.fPosition) / 80)));
                this.fPosition += 1;
            } else {
                this.muslim.y += Math.pow((this.muslim.x / 50), 2);
                this.muslim.angle += 20;
            }

            // fly
            if (this.flyAlmostHit) {
                this.killfly.x = 850;
                this.killfly.angle += 4;
                this.killfly.scale.x -= 0.008;
                this.killfly.scale.y -= 0.008;
                if (this.killfly.angle > 20) {
                    this.flyHit = true;
                }
                if (this.killfly.angle > 100) {
                    this.flyAlmostHit = false;
                }
            } else {
                this.killfly.x = 790;
                if (this.kPosition >= 60) this.kPosition = 0.0;
                this.killfly.y = 780.0 + (30 * (Math.sin((2 * Math.PI * this.kPosition) / 60)));
                this.kPosition += 1;
            }
            if ((this.flyShit.x < this.defaultFlyXDirection && this.defaultFlyDirection == '<') || (this.flyShit.x > this.defaultFlyXDirection && this.defaultFlyDirection == '>')) {
                switch (this.currentFly) {
                    case 'Elio':
                        this.flyShit.destroy();
                        this.defaultFlyX = -230;
                        this.defaultFlyXDirection = 870;
                        this.defaultFlyY = 100;
                        this.defaultFlyMoveX = 4;
                        this.defaultFlyKillX = 8;
                        this.defaultFlyDirection = '>';
                        this.flyShit = this.add.sprite(this.defaultFlyX, this.defaultFlyY, 'fly_guy');
                        this.flyShit.anchor.x = 0.5;
                        this.flyShit.anchor.y = 0;
                        this.flyShit.animations.add('run');
                        this.flyShit.animations.play('run', 10, true);
                        this.flyShit.inputEnabled = true;
                        this.flyShit.events.onInputDown.add(this.changeFly, this);
                        this.currentFly = 'Guy';
                        break;
                    case 'Guy':
                        this.flyShit.destroy();
                        this.defaultFlyX = -230;
                        this.defaultFlyXDirection = 870;
                        this.defaultFlyY = 100;
                        this.defaultFlyMoveX = 4;
                        this.defaultFlyKillX = 8;
                        this.defaultFlyDirection = '>';
                        this.flyShit = this.add.sprite(this.defaultFlyX, 100, 'fly_non');
                        this.flyShit.anchor.x = 0.5;
                        this.flyShit.anchor.y = 0;
                        this.flyShit.animations.add('run');
                        this.flyShit.animations.play('run', 10, true);
                        this.flyShit.inputEnabled = true;
                        this.flyShit.events.onInputDown.add(this.changeFly, this);
                        this.currentFly = 'Non';
                        break;
                    case 'Non':
                        this.flyShit.destroy();
                        this.defaultFlyX = 864;
                        this.defaultFlyXDirection = -230;
                        this.defaultFlyY = 100;
                        this.defaultFlyMoveX = -4;
                        this.defaultFlyKillX = -8;
                        this.defaultFlyDirection = '<';
                        this.flyShit = this.add.sprite(this.defaultFlyX, 100, 'fly_elio');
                        this.flyShit.anchor.x = 0.5;
                        this.flyShit.anchor.y = 0;
                        this.flyShit.animations.add('run');
                        this.flyShit.animations.play('run', 10, true);
                        this.flyShit.inputEnabled = true;
                        this.flyShit.events.onInputDown.add(this.changeFly, this);
                        this.currentFly = 'Elio';
                        break;
                }
                this.flyShit.x = this.defaultFlyX;
                this.flyShit.angle = 0;
                this.flyShit.scale.x = this.flyShit.scale.y = 1;
                this.flyHit = false;
                this.flyAlmostHit = false;
                this.killfly.angle = 10;
                this.killfly.scale.x = this.killfly.scale.y = 1;
                this.killfly.x = 790;
                if (this.flyHit) {
                    this.killfly.y = 780;
                }
            }
            if (this.flyHit) {
                this.flyShit.x += this.defaultFlyKillX;
            } else {
                this.flyShit.x += this.defaultFlyMoveX;
            }
            if (!this.flyHit) {
                if (this.flyPosition >= 80) {
                    this.flyPosition = 0.0;
                    this.randFlyAmplitude = this.rnd.integerInRange(10, 200);
                }
                this.flyShit.y = 50.0 + (this.randFlyAmplitude * (Math.sin((2 * Math.PI * this.flyPosition) / 80)));
                this.flyPosition += 1;
            } else {
                this.flyShit.y = Math.pow((this.flyShit.x / 50), 2);
                if (this.flyShit.scale.x > 0) this.flyShit.scale.x = this.flyShit.scale.y -= 0.1;
                this.flyShit.angle += 5;
            }

            // criminal
            if (this.crimineel.x < -240) {
                this.crimineel.x = 1000;
                this.crimineelHit = false;
                this.crimineelAlmostHit = false;
                this.politiewagen.x = 820;
            }
            if (this.crimineelAlmostHit) {
                this.crimineel.x -= 3;
                if (this.crimineel.x - this.politiewagen.x > 180) {
                    this.crimineelAlmostHit = false;
                    this.crimineelHit = true;
                } else {
                    this.politiewagen.x -= 12;
                }
            } else {
                if (this.crimineelHit) {
                    if (this.crimineel.x - this.politiewagen.x > 100) {
                        this.crimineel.x -= 2;
                    } else {
                        this.politiewagen.x -= 12;
                        this.crimineel.x -= 12;
                    }
                } else {
                    this.crimineel.x -= 3;
                }
            }


        }

    },

    startGame: function() {
        this.startHelpText.destroy();
        this.startButton.destroy();
        this.isRunning = true;
        this.timeCounter = this.add.text(400, 5, this.countDown, {
            font: '85px arial',
            fill: '#ff0000',
            align: 'center',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.timeCounter.anchor.x = 0.5;
        this.timeCounter.anchor.y = 0;
        this.mosqueScore = this.add.text(16, 16, 'VB\'er: 0', {
            font: '32px arial',
            fill: '#ff0000',
            align: 'left',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.mosqueScore.anchor.x = 0;
        this.mosqueScore.anchor.y = 0;
        this.flyingmuslimScore = this.add.text(16, 56, 'Andere VB\'er: 0', {
            font: '32px arial',
            fill: '#ff0000',
            align: 'left',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.flyingmuslimScore.anchor.x = 0;
        this.flyingmuslimScore.anchor.y = 0;
        this.flyScore = this.add.text(784, 16, 'Nog een VB\'er: 0', {
            font: '32px arial',
            fill: '#ff0000',
            align: 'right',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.flyScore.anchor.x = 1;
        this.flyScore.anchor.y = 0;
        this.crimineelScore = this.add.text(784, 56, 'Wilders: 0', {
            font: '32px arial',
            fill: '#ff0000',
            align: 'right',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.crimineelScore.anchor.x = 1;
        this.crimineelScore.anchor.y = 0;
        this.baseballbat.y = 900;
        this.killfly.y = 780;
        this.time.events.add(Phaser.Timer.SECOND * this.countDown, this.endGame, this);
    },

    endGame: function() {
        if (this.beepSound.isPlaying) this.beepSound.stop();
        if (this.trafficSound.isPlaying) this.trafficSound.stop();
        if (!this.applauseSound.isPlaying) this.applauseSound.play();
        this.timeCounter.setText(0);
        var hitCount = this.mosqueHitCount + this.flyingmuslimHitCount + this.flyHitCount;
        this.startHelpText = this.add.text(400, 200, 'Goed gedaan!\nU scoorde ' + hitCount + ' punten!', {
            font: '40px arial',
            fill: '#ff0000',
            align: 'center',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.startHelpText.anchor.x = 0.5;
        this.startHelpText.anchor.y = 0;
        (this.add.tween(this.mosque).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.mosque.destroy();
        }, this);
        (this.add.tween(this.flyingmuslim).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.flyingmuslim.destroy();
        }, this);
        (this.add.tween(this.flyShit).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.flyShit.destroy();
        }, this);
        (this.add.tween(this.crimineel).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.crimineel.destroy();
        }, this);
        (this.add.tween(this.politiewagen).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.politiewagen.destroy();
        }, this);
        (this.add.tween(this.baseballbat).to({
            y: 1500
        }, 2000, Phaser.Easing.Linear.Out, true, 0, false)).onComplete.add(function() {
            this.baseballbat.destroy();
        }, this);
        (this.add.tween(this.killfly).to({
            y: 1200
        }, 2000, Phaser.Easing.Linear.Out, true, 0, false)).onComplete.add(function() {
            this.killfly.destroy();
        }, this);
        this.isRunning = false;
        this.time.events.add(Phaser.Timer.SECOND * 4, this.showMessage, this);
    },

    showMessage: function() {
        this.cloudsTiled.stopScroll();
        this.skylineTiled.stopScroll();
        this.housesTiled.stopScroll();
        this.roadTiled.stopScroll();
        (this.add.tween(this.cloudsTiled).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.cloudsTiled.destroy();
        }, this);
        (this.add.tween(this.skylineTiled).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.skylineTiled.destroy();
        }, this);
        (this.add.tween(this.housesTiled).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.housesTiled.destroy();
        }, this);
        (this.add.tween(this.roadTiled).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.roadTiled.destroy();
        }, this);

        (this.add.tween(this.mosqueScore).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.mosqueScore.destroy();
        }, this);
        (this.add.tween(this.flyingmuslimScore).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.flyingmuslimScore.destroy();
        }, this);
        (this.add.tween(this.flyScore).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.flyScore.destroy();
        }, this);
        (this.add.tween(this.crimineelScore).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.crimineelScore.destroy();
        }, this);
        (this.add.tween(this.timeCounter).to({
            alpha: 0
        }, 2000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
            this.timeCounter.destroy();
            this.filipenkarolien = this.add.sprite(0, 0, 'filip_en_karolien');
            this.filipenkarolien.alpha = 0;
            (this.add.tween(this.filipenkarolien).to({
                alpha: 1
            }, 2000, Phaser.Easing.Linear.None, true, 2000, false)).onComplete.add(function() {
                var goedGedaanRegel = this.add.text(400, 20, 'Goed gedaan!\n U zorgde voor meer, meer, meer!', {
                    font: '40px arial',
                    fill: '#ff0000',
                    align: 'center',
                    stroke: "#FFFFFF",
                    strokeThickness: 6
                });
                goedGedaanRegel.anchor.x = 0.5;
                (this.add.tween(goedGedaanRegel).to({
                    alpha: 0
                }, 2000, Phaser.Easing.Linear.None, true, 5000, false)).onComplete.add(function() {
                    goedGedaanRegel.destroy();
                    var stemmenRegel = this.add.text(400, 20, 'Doe dat op 25 mei opnieuw en\nstem verstandig,\n niet op het Vlaams (on)belang', {
                        font: '40px arial',
                        fill: '#ff0000',
                        align: 'center',
                        stroke: "#FFFFFF",
                        strokeThickness: 6
                    });
                    stemmenRegel.anchor.x = 0.5;
                    (this.add.tween(stemmenRegel).to({
                        alpha: 0
                    }, 2000, Phaser.Easing.Linear.None, true, 7000, false)).onComplete.add(function() {
                        var stokachterdedeur = this.add.sprite(0, 0, 'stokachterdedeur');
                        stokachterdedeur.alpha = 0;
                        this.add.tween(stokachterdedeur).to({
                            alpha: 1
                        }, 2000, Phaser.Easing.Linear.None, true, 0, false);
                    }, this);
                }, this);
            }, this);
        }, this);

    },

    cloadsLoaded: function() {
        this.cloudsTiled.y = -50;
        this.cloudsTiled.autoScroll(20, 0);
        this.clouds.destroy();
    },

    skylineLoaded: function() {
        this.skylineTiled.y = -40;
        this.skylineTiled.autoScroll(-8, 0);
        this.skyline.destroy();
    },

    housesLoaded: function() {
        this.housesTiled.y = 0;
        this.housesTiled.autoScroll(-35, 0);
        this.houses.destroy();
    },

    roadLoaded: function() {
        this.roadTiled.y = 145;
        this.roadTiled.autoScroll(-100, 0);
        this.road.destroy();
        this.isLoaded = true;
        this.trafficSound.play();
        this.startHelpText = this.add.text(400, 170, 'Scoor zo veel mogelijk punten door \nVlaams Belangers, \nen ander krapuul\nuit te schakelen...', {
            font: '40px arial',
            fill: '#ff0000',
            align: 'center',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        this.startHelpText.anchor.x = 0.5;
        this.startHelpText.anchor.y = 0;
        this.startButton = this.add.button(420, 450, 'button', this.startGame, this, 2, 1, 0);
        this.startButton.anchor.x = 0.5;
    },

    changeMosque: function() {
        if (!this.mosqueHit) {
            this.mosque.loadTexture('nomosque');
            this.mosqueHit = true;
            this.mosqueHitCount++;
            this.mosqueScore.setText("VB\'er: " + this.mosqueHitCount.toString());
            if (this.mosqueSound.isPlaying) this.mosqueSound.stop();
        }
    },

    changeMuslim: function() {
        if (!this.flyingmuslimAlmostHit && !this.flyingmuslimHit) {
            this.flyingmuslimAlmostHit = true;
            this.flyingmuslimHitCount++;
            this.flyingmuslimScore.setText("Nog een VB\'er: " + this.flyingmuslimHitCount.toString());
            if (!this.baseballbatSound.isPlaying) this.baseballbatSound.play();
        }
    },

    changeFly: function() {
        if (!this.flyAlmostHit && !this.flyHit) {
            this.flyAlmostHit = true;
            this.flyHitCount++;
            this.flyScore.setText("Krapuul: " + this.flyHitCount.toString());
            if (!this.baseballbatSound.isPlaying) this.baseballbatSound.play();
        }
    },

    changeCrimineel: function() {
        if (!this.crimineelAlmostHit && !this.crimineelHit) {
            this.crimineelAlmostHit = true;
            this.crimineelHitCount++;
            this.crimineelScore.setText("Wilders: " + this.crimineelHitCount.toString());
            if (this.sireneSound.isPlaying) {
                this.sireneSound.stop();
                this.sireneSound.play();
            } else {
                this.sireneSound.play();
            }
        }
    }

};