var client_id = '94fbf1dd918af5f7791d75d623fb4448';

SC.initialize({
	client_id: client_id
});

SC.get('/users/infinityshred', function(info) {
  console.log(info);
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

	var track = document.getElementById('myTrack');
	SC.get('/tracks/' + info.tracks[0].id, function(sound){
		track.src = sound.stream_url + '?client_id=' + client_id;
		// track.play();
		console.log(sound);
	});	
});
