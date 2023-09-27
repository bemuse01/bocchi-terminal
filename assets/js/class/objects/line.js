import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({materialName, materialOpt}){
        this.materialName = materialName
        this.materialOpt = materialOpt
        
        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()

        this.mesh = new THREE.Line(geometry, material)
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()

        return geometry
    }
    createMaterial(){
        return new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
        this.mesh.geometry = null
        this.mesh.material = null
        this.mesh = null
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getMaterial(){
        return this.mesh.material
    }
    getPosition(){
        return this.position
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value){
        this.mesh.material.uniforms[name].value = value
    }
}