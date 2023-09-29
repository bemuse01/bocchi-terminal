// import Video from '../../class/video/video.js'
import Videos from '../../class/video/videos.js'
import Data from '../../../src/data/data.js'

export default {
    props: {
        ctx: Object,
        fontSize: Number,
    },
    template: `
        <div>
        </div>
    `,
    setup(props){
        const {onMounted, toRefs} = Vue


        // props
        const {fontSize} = props
        const {ctx} = toRefs(props)


        // videos
        // const src = './assets/src/videos/bocchi.mp4'
        const srcs = Data.map(data => data.src)
        let videos = null
        const createVideo = () => {
            videos = new Videos(srcs)
        }
        const animateVideo = () => {
            videos.animate()
        }
        const drawVideo = () => {
            if(!ctx.value) return

            const width = window.innerWidth
            const height = window.innerHeight

            ctx.value.clearRect(0, 0, width, height)

            const data = videos.getData()

            if(data.length === 0) return

            const rows = data.length
            const offsetY = height / 2 - (data.length * fontSize) / 2

            for(let i = 0; i < rows; i++){
                const characters = data[i].join(' ')
                const x = width / 2
                const y = offsetY + i * fontSize

                ctx.value.fillText(characters, x, y)
            }
        }


        // methods
        const animate = () => {
            animateVideo()
            drawVideo()

            requestAnimationFrame(animate)
        }
        const init = () => {
            createVideo()

            animate()
        } 


        // hooks
        onMounted(() => init())
    }
}