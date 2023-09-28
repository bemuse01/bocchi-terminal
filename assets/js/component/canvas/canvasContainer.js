import Video from '../../class/video/video.js'

export default {
    template: `
        <div 
            id="canvas-container"
            :style="containerStyle"
        >
            <canvas 
                :ref="el => canvas = el"
            />
        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()


        // container
        const containerStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        })


        // video
        const src = './assets/src/bocchi.mp4'
        let video = null
        const createVideo = () => {
            video = new Video(src)
        }
        const animateVideo = () => {
            video.animate()
        }


        // canvas
        const canvas = ref()
        const ctx = ref()
        const fontSize = 12
        let width = window.innerWidth
        let height = window.innerHeight
        // const chars = '@%#*+=-:. '
        const initCanvas = () => {
            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            width = window.innerWidth
            height = window.innerHeight

            canvas.value.width = width
            canvas.value.height = height

            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const drawCanvas = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            ctx.value.clearRect(0, 0, width, height)

            const data = video.getData()
            const play = video.isPlaying()

            if(!play) return

            const rows = data.length
            const offsetY = height / 2 - (data.length * fontSize) / 2
            // const cols = data[0].length
            // console.log(offsetY)

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
            drawCanvas()
            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
            createVideo()
            animate()

            window.addEventListener('resize', () => onWindowResize())
        }


        // hooks
        onMounted(() => {
            init()
        })


        return {
            canvas,
            containerStyle,
        }
    }
}