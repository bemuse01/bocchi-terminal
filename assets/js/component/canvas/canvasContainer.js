import Video from '../../class/video/video.js'
import VideoBox from './videoBox.js'
import TextBox from './textBox.js'

export default {
    components: {
        'video-box': VideoBox,
        'text-box': TextBox,
    },  
    template: `
        <div 
            id="canvas-container"
            :style="containerStyle"
        >

            <canvas 
                :ref="el => canvas = el"
            />

            <video-box
                :ctx="ctx"
                :fontSize="fontSize"
            />

            <!--<text-box
                :ctx="ctx"
                :fontSize="fontSize"
            />-->

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue
        // const {useStore} = Vuex


        // store
        // const store = useStore()


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


        // canvas
        const canvas = ref()
        const ctx = ref()
        const fontSize = 12
        const initCanvas = () => {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight

            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }


        // methods
        const onWindowResize = () => {
            resizeCanvas()
        }
        const animate = () => {
            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
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
            ctx,
            fontSize
        }
    }
}