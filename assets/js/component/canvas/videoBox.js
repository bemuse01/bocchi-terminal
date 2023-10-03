import VideoCanvas from './videoCanvas.js'
import TextCanvas2 from './textCanvas2.js'
import textCanvas2 from './textCanvas2.js'

export default {
    components: {
        'video-canvas': VideoCanvas,
        'text-canvas-2': TextCanvas2
    },
    props: {
        height: String,
        flex: String
    },
    template: `
        <div
            id="video-box"
            :ref="el => box = el"
            :style="boxStyle"
        >
            
            <video-canvas />
            <text-canvas-2 />

        </div>
    `,
    setup(props){
        const {ref, computed} = Vue


        // props
        const {flex, height} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            height,
            padding: '12px',
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '1px solid #777'
        }))


        return{
            box,
            boxStyle,
        }
    }
}