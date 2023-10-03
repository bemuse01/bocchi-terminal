import DirContainer from './dir/dirContainer.js'
import CanvasContainer from './canvas/canvasContainer.js'

export default {
    components: {
        'dir-container': DirContainer,
        'canvas-container': CanvasContainer,
    },
    template: `
        <div 
            id="app"
            :style="appStyle"
        >

            <dir-container />
            <canvas-container />

        </div>
    `,
    setup(){
        const {computed, onMounted} = Vue


        // app
        const appStyle = computed(() => ({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
        }))


        // method
        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }


        // hook
        onMounted(() => {
            animate()
        })


        return{
            appStyle
        }
    }
}