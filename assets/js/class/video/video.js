export default class{
    constructor(src){
        this.src = src

        this.canvas = null
        this.ctx = null
        this.video = null
        this.play = false

        this.chars = '@%#*+=-:. '
        this.data = []

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
        this.ctx = this.canvas.getContext('2d')
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


    // animate
    animate(){
        if(!this.play) return
        this.getVideoData()
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
                const character = this.chars[~~((avg / 255) * (this.chars.length - 1))]
                temp.push(character)
            }

            arr.push(temp)

            // console.log(temp.length)
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