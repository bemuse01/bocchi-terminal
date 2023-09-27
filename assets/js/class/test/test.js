import * as THREE from '../../lib/three.module.js'
import Method from '../../method/method.js'

import Plane from './comps/plane.js'

export default class{
    constructor({app, element}){
        this.renderer = app.renderer
        this.element = element

        this.fov = 60
        this.near = 0.1
        this.far = 10000
        this.cameraPosition = [0, 0, 100]   
        this.params = [
            {
                module: Plane
            }
        ]
        this.groups = []
        this.comps = []
        this.build = new THREE.Group()

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true})

        this.init()
    }


    // init
    init(){
        this.create()
        this.animate()
    }


    // create
    create(){
        this.createRenderObject()
        this.createObject()
    }
    createRenderObject(){
        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.fov, width / height, this.near, this.far)
        this.camera.position.set(...this.cameraPosition)
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: Method.getVisibleWidth(this.camera, 0),
                h: Method.getVisibleHeight(this.camera, 0)
            }
        }
    }
    createObject(){
        for(const param of this.params){
            const {module} = param
            const group = new THREE.Group()

            this.comps.push(
                new module({
                    group,
                    size: this.size,
                    renderer: this.renderer,
                    camera: this.camera,
                    comps: this.comps,
                    ...param
                })
            )
        }

        for(const {group} of this.comps) this.build.add(group)
        
        this.scene.add(this.build)
    }


    // get
    getTextures(){
        return new Promise((resolve, _) => {
            const manager = new THREE.LoadingManager()
            manager.onLoad = () => resolve(textures)
            
            const loader = new THREE.TextureLoader(manager)
            
            const textures = this.sources.map(file => loader.load(file))
        })
    }
    getImage(urls){
        return urls.map(url => new Promise((resolve, _) => {
            const img = new Image()
            img.src = url

            img.onload = () => resolve(img)
        }))
    }
    getImages(){
        return Promise.all(this.getImage(this.sources))
    }


    // animate
    animate(){
        this.render()
        this.animateObject()

        this.animation = requestAnimationFrame(() => this.animate())
    }
    render(){
        const rect = this.renderer.domElement.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        // const left = rect.left
        // const bottom = this.renderer.domElement.clientHeight - rect.bottom

        // this.renderer.setScissor(left, bottom, width, height)
        // this.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)

        // const canvas = this.renderer.domElement
        // const ctx = canvas.getContext('2d')
        // console.log(ctx)
        // ctx.getImageData(0, 0, width, height)

        this.ctx.drawImage(this.renderer.domElement, 0, 0, width, height)
        const imageData = this.ctx.getImageData(0, 0, width, height)

        console.log(imageData)
    }
    animateObject(){
        for(const comp of this.comps){
            if(!comp.animate) continue
            comp.animate()
        }
    }


    // resize
    resize(){
        this.resizeRenderObject()
        this.resizeObject()
    }
    resizeRenderObject(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: Method.getVisibleWidth(this.camera, 0),
                h: Method.getVisibleHeight(this.camera, 0)
            }
        }
    }
    resizeObject(){
        for(const comp of this.comps){
            if(!comp.resize) continue
            comp.resize(this.size)
        }
    }
}