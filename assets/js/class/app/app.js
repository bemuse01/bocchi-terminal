import * as THREE from '../../lib/three.module.js'

export default class{
    constructor(canvas){
        this.canvas = canvas

        this.width = 0
        this.height = 0
        
        this.init()
    }


    // init
    async init(){
        await this.create()
        this.animate()
    }


    // create
    async create(){
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: this.canvas})
        this.renderer.setPixelRatio(RATIO)
        this.renderer.setClearColor(0x000000, 0.0)
        this.renderer.setClearAlpha(0.0)
        this.renderer.autoClear = false

        await this.setSize()

        this.renderer.setSize(this.width, this.height)

    }


    // 
    setSize(){
        return new Promise((resolve, reject) => {
            const video = document.createElement('video')
            video.src = './assets/src/bocchi.mp4'

            video.onloadedmetadata = () => {
                this.width = video.videoWidth
                this.height = video.videoHeight
                resolve(video)
            }
        })
    }


    // render
    animate(){
        this.render()

        requestAnimationFrame(() => this.animate())
    }
    render(){
        // this.renderer.setScissorTest(false)
        // this.renderer.clear(true, true)
        // this.renderer.setScissorTest(true)
    }


    // resize
    resize(){
        // const {width, height} = this.canvas.getBoundingClientRect()

        // this.width = width
        // this.height = height

        // this.renderer.setSize(this.width, this.height)
    }
}