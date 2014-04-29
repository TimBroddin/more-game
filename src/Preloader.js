
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(232, 285, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
		this.load.image('sky', 'resources/sky.png');
		this.load.image('clouds2', 'resources/clouds2.png');
		this.load.image('skyline', 'resources/skyline.png');
		this.load.image('houses', 'resources/houses.png');
		this.load.image('road', 'resources/road.png');
		this.load.image('mosque', 'resources/mosque.png');
		this.load.image('nomosque', 'resources/nomosque.png');
		this.load.image('flyingcarpet', 'resources/flyingcarpet1.png');
		this.load.image('baseballbat', 'resources/baseballbat.png');
		this.load.image('killfly', 'resources/killfly.png');
		this.load.image('filip_en_karolien', 'resources/filip_en_karolien.png');
		this.load.image('stokachterdedeur', 'resources/stokachterdedeur.png');
		this.load.image('mmmlogo', 'resources/mmmlogo.png');
		this.load.image('hetspel', 'resources/hetspel.png');
		this.load.atlasJSONHash('muslim', 'resources/muslim.png', 'resources/muslim.json');
		this.load.atlasJSONHash('fly_elio', 'resources/fly_elio.png', 'resources/fly_elio.json');
		this.load.atlasJSONHash('fly_guy', 'resources/fly_guy.png', 'resources/fly_guy.json');
		this.load.atlasJSONHash('fly_non', 'resources/fly_non.png', 'resources/fly_non.json');
		this.load.atlasJSONHash('crimineel', 'resources/crimineel.png', 'resources/crimineel.json');
		this.load.atlasJSONHash('politiewagen', 'resources/politiewagen.png', 'resources/politiewagen.json');
		this.load.audio('song', ['resources/song.mp3', 'resources/song.ogg']);
		this.load.audio('trafficsound', ['resources/traffic.mp3', 'resources/traffic.ogg']);
		this.load.audio('mosquesound', ['resources/mosque.mp3', 'resources/mosque.ogg']);
		this.load.audio('baseballbatsound', ['resources/baseballbat.mp3', 'resources/baseballbat.ogg']);
		this.load.audio('muslimsound', ['resources/muslim.mp3', 'resources/muslim.ogg']);
		this.load.audio('sirene', ['resources/sirene.mp3', 'resources/sirene.ogg']);
		this.load.audio('beep', ['resources/beep.mp3', 'resources/beep.ogg']);
		this.load.audio('applause', ['resources/applause.mp3', 'resources/applause.ogg']);
		this.load.spritesheet('button', 'resources/potlood.png', 430, 120);
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('song') && this.ready == false)
		{
			this.ready = true;
			this.state.start('Intro');
		}

	}

};
