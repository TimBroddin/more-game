BasicGame.Intro = function(game) {

    this.music = null;
    this.playButton = null;

};

BasicGame.Intro.prototype = {

    create: function() {

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        this.music = this.add.audio('song', 0.5, true);
        this.music.play();

        this.add.sprite(0, 0, 'sky');

        var minimumVereisten = this.add.text(20, 520, 'Minimum vereisten:\nDesktop: Internet Explorer 9 of hoger, Chrome, Safari, Firefox\nMobiel: iPhone 5 of recenter, iPad 3 of recenter, Android 4.x of recenter\nOudere browsers en/of toestellen kunnen het spel vertragen!', {
            font: '14px arial',
            fill: '#000000',
            align: 'left'
        });
        minimumVereisten.anchor.x = 0;

        var vreemdelingenRegel = this.add.text(400, -50, 'Meer samenhorigheid!', {
            font: '60px arial',
            fill: '#ff0000',
            align: 'center',
            stroke: "#FFFFFF",
            strokeThickness: 6
        });
        vreemdelingenRegel.anchor.x = 0.5;
        vreemdelingenRegel.anchor.y = 0.5;
        (this.add.tween(vreemdelingenRegel).to({
            y: 300
        }, 1000, Phaser.Easing.Bounce.Out, true, 0, false)).onComplete.add(function() {
            (this.add.tween(vreemdelingenRegel).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, true, 500, false)).onComplete.add(function() {
                vreemdelingenRegel.setText('Meer tolerantie!');
                vreemdelingenRegel.y = -50;
                vreemdelingenRegel.alpha = 1;
                (this.add.tween(vreemdelingenRegel).to({
                    y: 300
                }, 1000, Phaser.Easing.Bounce.Out, true, 0, false)).onComplete.add(function() {
                    (this.add.tween(vreemdelingenRegel).to({
                        alpha: 0
                    }, 500, Phaser.Easing.Linear.None, true, 500, false)).onComplete.add(function() {
                        vreemdelingenRegel.setText('Meer verdraagzaamheid!');
                        vreemdelingenRegel.y = -50;
                        vreemdelingenRegel.alpha = 1;
                        (this.add.tween(vreemdelingenRegel).to({
                            y: 300
                        }, 1000, Phaser.Easing.Bounce.Out, true, 0, false)).onComplete.add(function() {
                            (this.add.tween(vreemdelingenRegel).to({
                                alpha: 0
                            }, 500, Phaser.Easing.Linear.None, true, 500, false)).onComplete.add(function() {
                                vreemdelingenRegel.setText('Meer, Meer, Meer ...');
                                vreemdelingenRegel.fill = '#ffffff';
                                vreemdelingenRegel.stroke = '#ff0000';
                                vreemdelingenRegel.y = -50;
                                vreemdelingenRegel.alpha = 1;
                                (this.add.tween(vreemdelingenRegel).to({
                                    y: 300
                                }, 1000, Phaser.Easing.Bounce.Out, true, 0, false)).onComplete.add(function() {
                                    var mmmlogo = this.add.sprite(400, 50, 'mmmlogo');
                                    mmmlogo.anchor.x = 0.5;
                                    mmmlogo.alpha = 0;
                                    (this.add.tween(mmmlogo).to({
                                        alpha: 1
                                    }, 2000, Phaser.Easing.Linear.None, true, 500, false)).onComplete.add(function() {
                                        (this.add.tween(vreemdelingenRegel).to({
                                            alpha: 0
                                        }, 500, Phaser.Easing.Linear.None, true, 500, false)).onComplete.add(function() {
                                            var hetspel = this.add.sprite(400, 200, 'hetspel');
                                            hetspel.anchor.x = 0.5;
                                            hetspel.alpha = 0;
                                            hetspel.angle = -10;
                                            (this.add.tween(hetspel).to({
                                                alpha: 1
                                            }, 1000, Phaser.Easing.Linear.None, true, 0, false)).onComplete.add(function() {
                                                this.playButton = this.add.button(420, 410, 'button', this.startGame, this, 2, 1, 0);
                                                this.playButton.anchor.x = 0.5;
                                            }, this);;
                                        }, this);;
                                    }, this);;
                                }, this);;
                            }, this);;
                        }, this);;
                    }, this);;
                }, this);;
            }, this);;
        }, this);;

    },

    update: function() {

        //clouds.tilePosition.x += 0.3;

    },

    startGame: function(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        //	And start the actual game
        this.playButton.destroy();

        this.state.start('Game');

    }

};