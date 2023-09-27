import CanvasContainer from './canvas/canvasContainer.js'

export default {
    components: {
        'canvas-container': CanvasContainer,
    },
    template: `
        <div 
            id="app"
            :style="appStyle"
        >

            <canvas-container />

        </div>
    `,
    setup(){
        const {ref, onMounted} = Vue


        // app
        const appStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
        })


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