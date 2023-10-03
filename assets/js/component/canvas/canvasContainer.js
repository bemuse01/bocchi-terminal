import Video from '../../class/video/video.js'
import VideoBox from './videoBox.js'
import TextBox from './textBox.js'

export default {
    props: {
        flex: String
    },
    components: {
        'video-box': VideoBox,
        'text-box': TextBox,
    },  
    template: `
        <div 
            id="canvas-container"
            :style="containerStyle"
        >

            <video-box
                height="80%"
            />

            <text-box
                height="20%"
            />

        </div>
    `,
    setup(props){
        const {ref, onMounted} = Vue
        // const {useStore} = Vuex


        // store
        // const store = useStore()


        // props
        const {flex} = props


        // container
        const containerStyle = ref({
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex,
        })


        return {
            containerStyle,
        }
    }
}