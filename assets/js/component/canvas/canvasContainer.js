import VideoCanvas from './videoCanvas.js'
import TextCanvas from './textCanvas.js'
import TextCanvas2 from './textCanvas2.js'
import CanvasBox from './canvasBox.js'
import {DIR_CONTAINER_WIDTH, MAIN_COLOR, BORDER, FONT_SIZE_RATIO, FONT_SIZE_RATIO_2} from '../../const/style.js'

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
                    :color="color"
                />
                <text-canvas-2 
                    padding="12px"
                    flex="1"
                    :color="color"
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
                    :color="color"
                />
                <text-canvas 
                    padding="12px"
                    flex="1"
                    :color="color"
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
        const border = BORDER
        const containerStyle = computed(() => ({
            position: 'absolute',
            right: '0',
            width: `calc(100% - ${DIR_CONTAINER_WIDTH}px)`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: border
        }))
        const color = MAIN_COLOR


        return {
            containerStyle,
            border,
            currentVideo,
            color,
        }
    }
}