import * as THREE from '../../../lib/three.module.js'
import Shader from '../shader/plane.shader.js'
import Plane from '../../objects/plane.js'

export default class{
    constructor({group, size}){
        this.group = group
        this.size = size

        this.texture = null
        this.plane = null

        this.init()
    }


    // 
    init(){
        this.create()
    }


    //
    async create(){
        const {size} = this
        const {w, h} = size.obj

        const video = await this.loadVideo()
        this.texture = new THREE.VideoTexture(video)

        this.plane = new Plane({
            width: 1,
            widthSeg: 1,
            height: 1,
            heightSeg: 1,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uTexture: {value: this.texture}
                }
            }
        })
        this.plane.get().scale.set(w, h, 1)

        this.group.add(this.plane.get())
    }
    createAttribute(){
    }


    // 
    async loadVideo(){
        return new Promise((resolve, reject) => {
            const video = document.createElement('video')
            video.src = './assets/src/bocchi.mp4'
            video.loop = true

            video.onloadedmetadata = () => {
                // this.width = video.videoWidth * this.ratio
                // this.height = video.videoHeight * this.ratio
                video.play()
                resolve(video)
            }
        })
    }


    // 
    animate(){

    }
}