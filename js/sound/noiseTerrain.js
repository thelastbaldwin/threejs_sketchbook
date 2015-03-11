var client_id = '94fbf1dd918af5f7791d75d623fb4448',
	context,
	trackBuffer, 
	source;

window.addEventListener('load', init, false);

function init() {
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
		source = context.createBufferSource();

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
						// trackBuffer = buffer;
						//is trackBuffer even necessary anymore?
						source.buffer = buffer;
						// source.buffer = trackBuffer;
						source.connect(context.destination);
						source.start(0);
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
