import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

/**
 * Base
 */
const parameters = {
    color: 0xf00000,
    // spin: () =>
    // {
    //     gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 })
    // }
}


const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load('/textures/BigEarth.jpg')
const hieghtTexture = textureLoader.load('/textures/world-map-elevation.webp')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
directionalLight.position.set(1, 0.20, 0)
scene.add(directionalLight)
/**
 * Object
 */
const geometry = new THREE.SphereGeometry(8, 64, 64)
const material = new THREE.MeshStandardMaterial({ map: colorTexture })//({ color: 0xfff000, wireframe:true })
const mesh = new THREE.Mesh(geometry, material);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper )

mesh.rotateX(0)
mesh.rotateY(0)
mesh.rotateZ(0)
scene.add(mesh)

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Debug
//  */
//      const gui = new dat.GUI()
//  gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation')
//  gui.add(mesh, 'visible')
//  gui.add(material, 'wireframe')

 window.addEventListener('keydown', (event) =>
 {
     if(event.key === 'h')
     {
         if(gui._hidden)
             gui.show()
         else
             gui.hide()
     }
 })

//  gui
//      .addColor(parameters, 'color')
//      .onChange(() =>
//      {
//          material.color.set(parameters.color)
//      })

//  gui.add(parameters, 'spin')

/**
 * Animate
 */
const clock = new THREE.Clock()
let timeSinceLastTick = 1;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const delta = elapsedTime - timeSinceLastTick;
    timeSinceLastTick = elapsedTime

    //Update controls
     //controls.update()
     mesh.rotateX(0.0 * delta)
     mesh.rotateY(0.1 * delta) 
     mesh.rotateZ(0.0 * delta)
     
    //console.log(delta);
     
    //Render
    renderer.render(scene, camera)

    //Call tick again on the next frame";
    window.requestAnimationFrame(tick)
}

tick()

 