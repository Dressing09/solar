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
const moonTexture = textureLoader.load('/textures/moonpoles.jpg')

const hieghtTexture = textureLoader.load('/textures/world-map-elevation.webp')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.05)
scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
directionalLight.position.set(1, 0.20, 0)
directionalLight.shadow.radius = 50
scene.add(directionalLight)

/**
 * Earth
 */
const earthGeometry = new THREE.SphereGeometry(1, 64, 64)
const earthMaterial = new THREE.MeshStandardMaterial({ map: colorTexture })//({ color: 0xfff000, wireframe:true })
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.add(new THREE.AxesHelper(2));
scene.add(earthMesh)

//moonMesh.postion.X2 
/**
 * Moon
 */
 const moonGeometry = new THREE.SphereGeometry(.2, 64, 64)
 const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture })//({ color: 0xfff000, wireframe:true })
 const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
 moonMesh.add(new THREE.AxesHelper(1));
 moonMesh.rotateY(-.5 * Math.PI)
 scene.add(moonMesh)

//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper )


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

  //gui
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
const moonDistance = 4;
let timeSinceLastTick = 1;

let moonAngle = 0;
 
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const delta = elapsedTime - timeSinceLastTick;
    timeSinceLastTick = elapsedTime

    //Update controls
     //controls.update()
     earthMesh.rotateX(0.0 * delta)
     earthMesh.rotateY(0.100 * delta) 
     earthMesh.rotateZ(0.0 * delta)

     const moonX = Math.cos(moonAngle) * moonDistance;
     const moonY = Math.sin(moonAngle) * moonDistance;

     const moonRotation = 1 * delta;

    //  console.log("A:" + moonAngle + " X:" + moonX + " Z: " + moonY)

     moonMesh.rotateY(moonRotation)
    

     console.log

     moonMesh.position.set(moonX, 0, moonY);     
     
    //console.log(delta);
     
    //Render
    renderer.render(scene, camera)

    //Call tick again on the next frame";
    window.requestAnimationFrame(tick)

    moonAngle -= moonRotation;
}

tick()

 