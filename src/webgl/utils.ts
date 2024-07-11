import * as THREE from "three"

export interface FresnelMaterialParameters {
  fresnelColor: THREE.ColorRepresentation
  baseColor: THREE.ColorRepresentation
  amount?: number
  offset?: number
  intensity?: number
  fresnelAlpha?: number
  alpha?: boolean
}

export function FresnelMaterial(parameters: FresnelMaterialParameters) {
  const {
    fresnelColor,
    baseColor,
    amount = 2.5,
    offset = 0.05,
    intensity = 0.8,
    fresnelAlpha = 1,
    alpha = true,
  } = parameters

  const uniforms = {
    uFresnelColor: { value: new THREE.Color(fresnelColor) },
    uBaseColor: { value: new THREE.Color(baseColor) },
    uFresnelAmt: { value: amount },
    uFresnelOffset: { value: offset },
    uFresnelIntensity: { value: intensity },
    uFresnelAlpha: { value: fresnelAlpha },
  }

  const vertexShader = `
	out vec3 vView;
  out vec3 vNormal;

  void main() {
    vec3 objectPosition = ( modelMatrix * vec4( position, 1.0 ) ).xyz;
    vView = normalize( cameraPosition - objectPosition );
    vNormal = normalize( ( modelMatrix * vec4( normal, 0.0 ) ).xyz );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `

  const fragmentShader = `
  uniform vec3 uFresnelColor;
  uniform vec3 uBaseColor;
  uniform float uFresnelAmt;
  uniform float uFresnelOffset;
  uniform float uFresnelIntensity;
  uniform float uFresnelAlpha;

  in vec3 vView;
  in vec3 vNormal;

  float lambertLighting( vec3 normal, vec3 viewDirection ) {
    return max( dot( normal, viewDirection ), 0.0 );
  }

  float fresnelFunc( float amount, float offset, vec3 normal, vec3 view) {
    return offset + ( 1.0 - offset ) * pow( 1.0 - dot( normal , view ), amount );
  }

  void main() {
    float fresnel = fresnelFunc( uFresnelAmt, uFresnelOffset, vNormal, vView );
    vec3 fresnelColor = ( uFresnelColor * fresnel ) * uFresnelIntensity;
    float diffuse = lambertLighting( vNormal, vView );
    vec3 diffuseColor = uBaseColor * diffuse;
    vec3 finalColor = mix( diffuseColor, fresnelColor, fresnel * uFresnelAlpha );
    float alpha = ${alpha ? "fresnel;" : "1.0;"}
    gl_FragColor = ${alpha ? "vec4( fresnelColor, fresnel );" : "vec4( finalColor, 1.0 );"} 
  }
  `

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })
}
