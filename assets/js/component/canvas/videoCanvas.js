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
            <div
                :ref="el => wrapper = el"
                :style="wrapperStyle"
            >

                <canvas 
                    :ref="el => canvas = el"
                />

            </div>
            
        </div>
    `,
    setup(props){
        const {onMounted, ref, computed} = Vue


        // props
        const {flex} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            width: '100%',
            height: '100%',
        }))


        // wrapper
        const wrapper = ref()
        const wrapperStyle = computed(() => ({
            width: '100%',
            height: '100%',
            display: 'flex'
        }))
    

        // canvas
        const canvas = ref()
        const canvasStyle = computed(() => ({
            width: '100%',
            height: '100%'
        }))
        const ctx = ref()
        const fontSize = 10
        const initCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }


        // videos
        const srcs = Data.map(data => data.src)
        let videos = null
        const maxPadding = 3
        const createVideo = () => {
            videos = new Videos(srcs)
        }
        const animateVideo = () => {
            videos.animate()
        }
        const drawLineNumber = (height) => {
            const rows = ~~(height / fontSize)

            for(let i = 0; i < rows; i++){
                const text = i.toString()
                const padding = Array.from({length: maxPadding - text.length}, _ => ' ').join('')
                ctx.value.fillText(i, fontSize, i * fontSize)
            }
        }
        const drawVideo = () => {
            if(!ctx.value) return

            const {width, height} = wrapper.value.getBoundingClientRect()

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
            wrapper,
            wrapperStyle,
            canvas,
            canvasStyle
        }
    }
}