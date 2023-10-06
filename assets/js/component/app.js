const App = {
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
        const {computed, ref, onMounted} = Vue


        // app
        const width = ref(0)
        const height = ref(0)
        const transform = computed(() => width.value < height.value ? 'rotate(90deg)' : 'none')
        const appStyle = computed(() => ({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            border: `2px solid ${MAIN_COLOR}33`,
            // transform: transform.value
        }))
        const setSize = () => {
            width.value = window.innerWidth
            height.value = window.innerHeight
        }


        // method
        const onWindowResize = () => {
            setSize()
        }
        const init = () => {
            setSize()

            window.addEventListener('resize', () => onWindowResize())
        }


        // hooks
        onMounted(() => init())


        return{
            appStyle
        }
    }
}