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
        const fontSize = 7
        const chars = '@%#*+=-:. '
        const initCanvas = () => {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const drawCanvas = () => {
            const width = window.innerWidth
            const height = window.innerHeight

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

            const rows = data.length
            const cols = data[0].length

            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    const x = j * fontSize
                    const y = i * fontSize
                    const character = data[i][j]
                    ctx.value.fillText(character, x, y)
                }
            }
        }


        // methods
        const animate = () => {
            animateVideo()
            drawCanvas()
            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
            createVideo()
            animate()
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