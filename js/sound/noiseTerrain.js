var client_id = '94fbf1dd918af5f7791d75d623fb4448',
	context,
	// audioBuffer, 
	sourceNode,
	analyser,
	javascriptNode;

window.addEventListener('load', init, false);

function init() {
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
		sourceNode = context.createBufferSource();
		//appears to be the default?
		sourceNode.connect(context.destination);

		//analyser
		analyser = context.createAnalyser();
		// We use a smoothingTimeConstant to make the meter less jittery
		analyser.smoothingTimeConstant = 0.3;
		analyser.fftSize = 1024;

		javascriptNode = context.createScriptProcessor(2048, 1, 1);

		SC.initialize({
			client_id: client_id
		});

		SC.get('/users/infinityshred', function(info) {
			console.log('info', info);
		});

		SC.get('/users/infinityshred/playlists/6281929', function(info) {
			console.log(info);
			info.tracks.forEach(function(track){
				console.log(track);
			});

			//initializes some shitty flash player
			// SC.stream(info.tracks[0].stream_url, {useHTML5Audio: true}, function(sound){
			//	console.log(sound);
			//	sound.play();
			// });

			SC.get('/tracks/' + info.tracks[1].id, function(sound){
				var xhr = new XMLHttpRequest();
				xhr.open('GET', sound.stream_url + '?client_id=' + client_id, true);
				xhr.responseType = 'arraybuffer';

				xhr.onload = function(){
					context.decodeAudioData(xhr.response, function(buffer){
						// audioBuffer = buffer;
						//is trackBuffer even necessary anymore?
						sourceNode.buffer = buffer;
						sourceNode.connect(context.destination);
						sourceNode.start(0);
					});
				};
				xhr.send();
				// context.decodeAudioData(sound, function(buffer){
				// trackBuffer = buffer;
				// });
				// track.src = sound.stream_url + '?client_id=' + client_id;
				// track.play();
				console.log(sound);
			});
		});
	}
	catch(e) {
		console.log('Web Audio API is not supported in this browser');
	}
}
