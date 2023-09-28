export default class{
    constructor(src){
        this.src = src

        this.canvas = null
        this.ctx = null
        this.video = null
        this.play = false

        this.step = 2
        this.chars = '@%#*+=-:. '
        this.data = []
        this.threshold = ~~(255 * ((this.chars.length - 1) / this.chars.length))

        this.init()
    }


    // 
    async init(){
        await this.create()
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


    // animate
    animate(){
        if(!this.play) return
        this.getVideoData()
    }
    getVideoData(){
        const {videoWidth, videoHeight} = this.video

        this.ctx.drawImage(this.video, 0, 0, videoWidth, videoHeight)
        const {data} = this.ctx.getImageData(0, 0, videoWidth, videoHeight)

        const step = this.step
        const rows = videoHeight / step
        const cols = videoWidth / step

        const arr = []

        for(let i = 0; i < rows; i++){

            const ii = i * step
            const temp = []

            for(let j = 0; j < cols; j++){

                const jj = j * step

                let sum = 0

                for(let k = 0; k < step; k++) for(let l = 0; l < step; l++){
                    const p = data[((ii + k) * videoWidth + (jj + l)) * 4]
                    sum += p
                }

                const avg = sum / (step * step)
                const avg2 = avg > this.threshold ? 255 : avg
                const character = this.chars[~~((avg2 / 255) * (this.chars.length - 1))]

                temp.push(character)

            }

            arr.push(temp)
        }

        this.data = arr
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