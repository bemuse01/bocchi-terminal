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
        let width = 0
        let height = 0
        // const chars = '@%#*+=-:. '
        const initCanvas = () => {
            width = window.innerWidth
            height = window.innerHeight

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
            // const cols = Math.ceil(width / fontSize) + 1
            // const rows = Math.ceil(height / fontSize) + 1

            // for(let i = 0; i < rows; i++){
            //     for(let j = 0; j < cols; j++){
            //         const x = j * fontSize
            //         const y = i * fontSize
            //         const character = chars[~~(Math.random() * chars.length)]
            //         ctx.value.fillText(character, x, y)
            //     }
            // }

            ctx.value.clearRect(0, 0, width, height)

            const data = video.getData()
            const play = video.isPlaying()

            if(!play) return

            // console.log(width, h eight)
            // console.log(data)

            const rows = data.length
            // const offsetX = width / 2 - (data[0].join(' ').length * fontSize) / 2
            const offsetY = height / 2 - (data.length * fontSize) / 2
            // const cols = data[0].length
            // console.log(offsetX, width / 2)

            for(let i = 0; i < rows; i++){
                const characters = data[i].join(' ')
                // const charsWidth = ctx.value.measureText(text)
                const x = width / 2
                const y = offsetY + i * fontSize

                ctx.value.fillText(characters, x, y)
            }

            console.log('work')
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