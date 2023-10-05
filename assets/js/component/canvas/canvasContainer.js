import VideoCanvas from './videoCanvas.js'
import TextCanvas from './textCanvas.js'
import TextCanvas2 from './textCanvas2.js'
import CanvasBox from './canvasBox.js'
import {DIR_CONTAINER_WIDTH} from '../../const/style.js'

export default {
    props: {
        flex: String
    },
    components: {
        'canvas-box': CanvasBox,
        'video-canvas': VideoCanvas,
        'text-canvas': TextCanvas,
        'text-canvas-2': TextCanvas2
    },  
    template: `
        <div 
            id="canvas-container"
            :style="containerStyle"
        >

            <canvas-box
                width="100%"
                height="80%"
                :borderBottom="border"
            >

                <video-canvas 
                    :borderRight="border"
                    :currentVideo="currentVideo"
                    padding="12px"
                    width="68%"
                />
                <text-canvas-2 
                    padding="12px"
                    flex="1"
                />

            </canvas-box>
            

            <canvas-box
                width="100%"
                height="20%"
            >

                <text-canvas 
                    :borderRight="border"
                    padding="12px"
                    width="50%"
                />
                <text-canvas 
                    padding="12px"
                    flex="1"
                />

            </canvas-box>

        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        

        // video
        const currentVideo = computed(() => store.getters['video/getCurrentVideo'])


        // container
        const border = '1px solid #777'
        const containerStyle = computed(() => ({
            position: 'absolute',
            right: '0',
            width: `calc(100% - ${DIR_CONTAINER_WIDTH}px)`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: border
        }))


        return {
            containerStyle,
            border,
            currentVideo
        }
    }
}