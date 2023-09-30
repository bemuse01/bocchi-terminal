// import Video from '../../class/video/video.js'
import Videos from '../../class/video/videos.js'
import Data from '../../../src/data/data.js'

export default {
    props: {
        flex: String
    },
    template: `
        <div
            :ref="el => box = el"
            :style="boxStyle"
        >
            <canvas 
                :ref="el => canvas = el"
            />
        </div>
    `,
    setup(props){
        const {onMounted, ref, computed} = Vue


        // props
        const {flex} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            flex
        }))


        // canvas
        const canvas = ref()
        const ctx = ref()
        const fontSize = 10
        const initCanvas = () => {
            const {width, height} = box.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            const {width, height} = box.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }


        // videos
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

            const {width, height} = box.value.getBoundingClientRect()

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
        const onWindowResize = () => {
            resizeCanvas()
        }
        const animate = () => {
            animateVideo()
            drawVideo()

            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
            createVideo()

            animate()

            window.addEventListener('resize', () => onWindowResize())
        } 


        // hooks
        onMounted(() => init())


        return{
            box,
            boxStyle,
            canvas
        }
    }
}