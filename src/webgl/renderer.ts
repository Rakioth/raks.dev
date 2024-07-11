import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

export const setupRenderer = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(61, 1, 1, 1000)
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  const group = new THREE.Group()
  const geometry = new THREE.IcosahedronGeometry(1, 12)

  camera.position.z = 2
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(215, 215)
  scene.add(group)

  return { scene, camera, renderer, group, geometry }
}

export const setupOrbitControls = (
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement
) => {
  const controls = new OrbitControls(camera, canvas)

  controls.autoRotate = true
  controls.enableDamping = true
  controls.enableZoom = false
  controls.minPolarAngle = Math.PI / 2
  controls.maxPolarAngle = Math.PI / 2
  controls.update()

  return controls
}

export const loadTextures = (textures: string[]) => {
  const textureLoader = new THREE.TextureLoader()

  return Promise.all(
    textures.map(
      (texture) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(texture, resolve, undefined, reject)
        })
    )
  )
}

export const renderingManager = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  animation: () => void
) => {
  const reducedMotionPreference = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  )

  let isRendering = false
  let animationId: number

  const tick = () => {
    animationId = requestAnimationFrame(tick)
    animation()
    renderer.render(scene, camera)
  }

  const startRendering = () => {
    if (!isRendering) animationId = requestAnimationFrame(tick)
    isRendering = true
  }

  const stopRendering = () => {
    if (isRendering) cancelAnimationFrame(animationId)
    isRendering = false
  }

  const initRendering = () => {
    if (!isRendering) {
      tick()
      isRendering = true
    }
    if (!reducedMotionPreference.matches) stopRendering()
  }

  reducedMotionPreference.addEventListener(
    "change",
    (event: MediaQueryListEvent) => {
      if (event.matches) startRendering()
      else stopRendering()
    }
  )

  return {
    startRendering,
    stopRendering,
    initRendering,
    reducedMotionPreference,
  }
}
