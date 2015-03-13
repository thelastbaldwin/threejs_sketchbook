THREE.RadialGradientShader = {
	uniforms : {
		'radialDist' : {type: 'f', value: Math.sqrt(Math.pow(window.innerHeight, 2), Math.pow(window.innerWidth, 2))},
		'xy' : {type: 'v2', value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2)},
		'outerColor' : {type: 'v3', value: new THREE.Vector3(0, 0, 0)},
		'innerColor' : {type: 'v3', value: new THREE.Vector3(1, 0, 1)}
	},
	vertexShader : [
		'void main() {',
			'gl_Position = projectionMatrix *',
			'modelViewMatrix *',
			'vec4(position,1.0);',
		'}'
	].join('\n'),
	fragmentShader : [
		'uniform float radialDist;',
		'uniform vec2 xy;',
		'uniform vec3 outerColor, innerColor;',
		'void main() {',
			'float dist = distance(gl_FragCoord.xy, xy)/radialDist;',
			'vec3 newColor = mix(innerColor, outerColor, dist);',
			'gl_FragColor = vec4(newColor, 1.0);',
		'}'
	].join('\n')
};