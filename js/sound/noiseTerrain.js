var client_id = '94fbf1dd918af5f7791d75d623fb4448',
	context,
	BUFFERS = [],
	currentTrack = 0,
	sourceNode,
	analyser,
	javascriptNode,
	gainNode,
	playListLoaded = false,
	volume = 0;

window.addEventListener('load', init, false);

function init() {
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
		gainNode = context.createGain();

		//analyser
		analyser = context.createAnalyser();
		// We use a smoothingTimeConstant to make the meter less jittery
		analyser.smoothingTimeConstant = 0.3;
		// The fftSize determine how many buckets we get containing frequency information.
		analyser.fftSize = 1024;

		javascriptNode = context.createScriptProcessor(2048, 1, 1);
		javascriptNode.onaudioprocess = function(){
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);

				var sum = Array.prototype.reduce.call(array, function(prev, current){
					return prev + current;
				});
				var average = (array.length > 0 ) ? sum/array.length: 0;
				volume = average;
		};

		javascriptNode.connect(context.destination);
		gainNode.connect(context.destination);
		analyser.connect(javascriptNode);

		SC.initialize({
			client_id: client_id
		});

		SC.get('/users/infinityshred/playlists/6281929', function(info) {
			var loadedTracks = 0;
			// console.log(info);
			info.tracks.forEach(function(track, index){
				var xhr = new XMLHttpRequest();
				xhr.open('GET', track.stream_url + '?client_id=' + client_id, true);
				xhr.responseType = 'arraybuffer';
				xhr.onload = function(){
					// console.log('track ' + index + ' loaded');
					context.decodeAudioData(xhr.response, function(buffer){
						BUFFERS[index] = buffer;
					});
					loadedTracks++;
					if(loadedTracks === info.tracks.length){
						console.log('playlist loaded');
						playListLoaded = true;
					}
				};
				xhr.send();
			});
		});
	}
	catch(e) {
		console.log('Web Audio API is not supported in this browser');
	}
}

function playSound(buffer, time){
	if(sourceNode){
		//this prevents playing multiple tracks at once
		sourceNode.stop();
	}
	sourceNode = context.createBufferSource();

	sourceNode.connect(analyser);
	sourceNode.connect(gainNode);
	sourceNode.connect(context.destination);

	sourceNode.buffer = buffer;
	sourceNode.connect(context.destination);
	sourceNode.start(0);
}

function pause(){
	sourceNode.stop();
}
