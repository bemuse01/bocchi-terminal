export default class{
    constructor(src){
        this.src = src

        this.canvas = null
        this.ctx = null
        this.video = null
        this.play = false

        this.chars = '@%#*+=-:. '
        // this.chars = '@%#&8O*+=-:. '
        this.data = []
        this.threshold = ~~(255 * ((this.chars.length - 1) / this.chars.length)) + 15
        // this.gpu = new GPU.GPU()
        // this.getCharIdx = null

        this.init()
    }


    // 
    async init(){
        await this.create()
        // this.createGPGPU()
        this.play = true
    }


    // 
    async create(){
        this.createCanvas()
        await this.createVideo()
    }
    createCanvas(){
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true})
    }
    async createVideo(){
        this.video = await this.loadVideo()
    }


    // load
    loadVideo(){
        return new Promise((resolve, reject) => {
            const video = document.createElement('video')
            video.src = this.src
            video.muted = true
            video.loop = true

            video.onloadedmetadata = () => {
                // this.width = video.videoWidth * this.ratio
                // this.height = video.videoHeight * this.ratio
                this.canvas.width = video.videoWidth
                this.canvas.height = video.videoHeight
                video.play()
                resolve(video)
            }
            video.onerror = (err) => {
                reject(err)
            }
        })
    }


    // gpgpu
    createGPGPU(){
        this.createGpuKernels()
    }
    createGpuKernels(){
        this.getCharIdx = this.gpu.createKernel(function(data){
            const ii = this.thread.y * 2
            const jj = this.thread.x * 2

            const oCols = this.constants.oCols
            const threshold = this.constants.threshold
            const charsLen = this.constants.charsLen

            const cols = oCols / 2

            const p1 = data[((ii + 0) * oCols + (jj + 0)) * 4]
            const p2 = data[((ii + 1) * oCols + (jj + 0)) * 4]
            const p3 = data[((ii + 0) * oCols + (jj + 1)) * 4]
            const p4 = data[((ii + 1) * oCols + (jj + 1)) * 4]

            const avg = (p1 + p2 + p3 + p4) / 4
            const avg2 = avg > threshold ? 255 : avg
            const charIdx = Math.floor((avg2 / 255) * (charsLen - 1))

            // for(let j = 0; j < cols; j++){
                
            // }

            return charIdx
        }).setDynamicOutput(true)

        // this.moveParticle.setInjectedNative(ShaderMethod2.snoise3DHelper())
        // this.movePosition.addNativeFunction('interpolate', `
        //     float interpolate(float p0, float p1, float t){
        //         return mix(p0, p1, t);
        //     }
        // `)
        // this.movePosition.addNativeFunction('clamping', `
        //     float clamping(float v, float mn, float mx){
        //         return clamp(v, mn, mx);
        //     }
        // `)
    }


    // animate
    animate(){
        if(!this.play) return
        this.getVideoData()
        // this.getVideoData2()
    }
    getVideoData(){
        const {videoWidth, videoHeight} = this.video

        this.ctx.drawImage(this.video, 0, 0, videoWidth, videoHeight)
        const {data} = this.ctx.getImageData(0, 0, videoWidth, videoHeight)

        const step = 2
        const rows = videoHeight / step
        const cols = videoWidth / step

        const arr = []

        for(let i = 0; i < rows; i++){

            const ii = i * 2
            const temp = []

            for(let j = 0; j < cols; j++){
                // const idx = i * cols + j

                // console.log(idx * 4)

                const jj = j * 2

                const p1 = data[((ii + 0) * videoWidth + (jj + 0)) * 4]
                const p2 = data[((ii + 1) * videoWidth + (jj + 0)) * 4]
                const p3 = data[((ii + 0) * videoWidth + (jj + 1)) * 4]
                const p4 = data[((ii + 1) * videoWidth + (jj + 1)) * 4]

                const avg = (p1 + p2 + p3 + p4) / 4
                const avg2 = avg > this.threshold ? 255 : avg
                const character = this.chars[~~((avg2 / 255) * (this.chars.length - 1))]
                temp.push(character)
            }

            arr.push(temp)

            // console.log(temp.length)
        }

        this.data = arr
    }
    getVideoData2(){
        const {videoWidth, videoHeight} = this.video

        this.ctx.drawImage(this.video, 0, 0, videoWidth, videoHeight)
        const {data} = this.ctx.getImageData(0, 0, videoWidth, videoHeight)
        // const len = (videoWidth / 2) * (videoHeight / 2)

        this.getCharIdx.setOutput([videoHeight / 2, videoWidth / 2])
        this.getCharIdx.setConstants({
            oCols: videoWidth,
            threshold: this.threshold,
            charsLen: this.chars.length
            // opacityStep: new Float32Array(opacityStep),
            // opacityLen: opacityStep.length,
            // positionStep: [0, 1],
            // positionLen: positionStep.length,
            // duration: animDuration,
            // radius,
        })

        const res = this.getCharIdx(data)

        // console.log(res)
        this.data = res.map(e => [...e].map(d => this.chars[d]))

        // console.log(this.data)
    }


    // 
    getData(){
        return this.data
    }


    // 
    isPlaying(){
        return this.play
    }
}