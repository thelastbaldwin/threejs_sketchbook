THREE.PixelShader = {
	uniforms : {
		'tDiffuse' : {type: 't', value: null},
		'pixelSize' : {type: 'f', value: 10}
	}, 
	vertexShader : [
		'varying vec2 vUv;',
		'void main() {',
			'vUv = uv;',
			'gl_Position = projectionMatrix *',
			'modelViewMatrix *',
			'vec4(position,1.0);',
		'}'
	].join('\n'),
	fragmentShader : [
		'uniform sampler2D tDiffuse;',
		'uniform float pixelSize;',
		'varying vec2 vUv;',
		'void main() {',
			'float dx = pixelSize *(1.0/512.0);',
			'float dy = pixelSize * 1.5 *(1.0/512.0);',
			'vec2 coord = vec2(dx*floor(vUv.x/dx), dy*floor(vUv.y/dy));',
			'gl_FragColor = texture2D(tDiffuse, coord);',
		'}'
	].join('\n')
};