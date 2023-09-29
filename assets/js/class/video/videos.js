export default class{
    constructor(srcs){
        this.srcs = srcs

        this.videos = []
        this.idx = 0
        this.data = []
        this.step = 2
        this.chars = '@%#*+=-:. '
        this.threshold = ~~(255 * ((this.chars.length - 1) / this.chars.length))

        this.init()
    }


    // init
    async init(){
        this.videos = await this.loadVideos()
        this.initCanvas()
        this.initVideo()
    }


    // canvas
    initCanvas(){
        this.createCanvas()
        this.setCanvasSize()
    }
    createCanvas(){
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true})
    }
    setCanvasSize(){
        const video = this.getCurrentVideo()
        this.canvas.width = video.videoWidth
        this.canvas.height = video.videoHeight
    }


    // video
    initVideo(){
        this.playCurrentVideo()
        this.setVideo()
    }
    setVideo(){
        this.videos.forEach(video => {
            video.addEventListener('ended', () => {
                this.idx = (this.idx + 1) % this.videos.length
                this.playCurrentVideo()
                this.setCanvasSize()
            })
        })
    }
    playCurrentVideo(){
        const video = this.videos[this.idx]

        video.play()
    }
    setIdx(){
        this.idx = (this.idx + 1) % this.videos.length
    }


    // load
    loadVideo(src){
        return new Promise((resolve, reject) => {
            const video = document.createElement('video')
            video.src = src
            video.muted = true
            // video.loop = true

            video.onloadedmetadata = () => {
                resolve(video)
            }
            video.onerror = (err) => {
                reject(err)
            }
        })
    }
    loadVideos(){
        return Promise.all(this.srcs.map(src => this.loadVideo(src)))
    }


    // 
    getCurrentVideo(){
        return this.videos[this.idx]
    }
    getData(){
        return this.data
    }


    animate(){
        this.getVideoData()
    }
    getVideoData(){
        const video = this.getCurrentVideo()

        if(!video) return

        const {videoWidth, videoHeight} = video

        this.ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
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
}