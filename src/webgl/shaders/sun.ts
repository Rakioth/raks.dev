export const vertexSun = `
	uniform float uTime;
	varying vec2 vUv;
	varying vec3 vLayer0;
	varying vec3 vLayer1;
	varying vec3 vLayer2;
	varying vec3 eyeVector;
	varying vec3 vNormal;

	mat2 rotate( float a ) {
		float s = sin(a);
		float c = cos(a);
		return mat2( c, -s, s, c );
	}

	void main() {
		vNormal = normal;

		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
		eyeVector = normalize( worldPosition.xyz - cameraPosition );

		float t = uTime * 0.002;

		mat2 rot = rotate( t );
		vec3 p0 = position;
		p0.yz = rot * p0.yz;
		vLayer0 = p0;

		mat2 rot1 = rotate( t * 1.5 + 10.0 );
		vec3 p1 = position;
		p1.xz = rot1 * p1.xz;
		vLayer1 = p1;

		mat2 rot2 = rotate( t * 2.0 + 30.0 );
		vec3 p2 = position;
		p2.xy = rot2 * p2.xy;
		vLayer2 = p2;

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );
	}
`

export const fragmentSun = `
	uniform samplerCube uPerlin;
	varying vec3 vNormal;
	varying vec3 vLayer0;
	varying vec3 vLayer1;
	varying vec3 vLayer2;
	varying vec3 eyeVector;

	float Fresnel( vec3 eyeVector, vec3 worldNormal ) {
		return pow( 1.0 + dot( eyeVector, worldNormal ), 3.0 );
	}

	vec3 brightnessToColor( float b ){
		b *= 0.25;
		return ( vec3( b, b * b, b * b * b * b ) / 0.25 ) * 0.65;
	}

	float supersun() {
		float sun = 0.0;
		sun += textureCube( uPerlin, vLayer0 ).r;
		sun += textureCube( uPerlin, vLayer1 ).r;
		sun += textureCube( uPerlin, vLayer2 ).r;
		sun *= 0.33;
		return sun;
	}

	void main() {
		float brightness = supersun();
		brightness = brightness * 4.0 + 1.0;

		float fres = Fresnel( eyeVector, vNormal );
		brightness += pow( fres, 0.8 );

		vec3 col = brightnessToColor( brightness );
		gl_FragColor = vec4( col, 1.0 );
	}
`
