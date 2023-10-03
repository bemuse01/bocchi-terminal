import TextCanvas from './textCanvas.js'

export default {
    components: {
        'text-canvas': TextCanvas
    },
    props: {
        height: {
            default: '100%',
            type: String,
        },
        padding: {
            default: '0',
            type: String
        },
        flexDirection: {
            default: 'row',
            type: String
        }
    },
    template: `
        <div
            id="text-box"
            :ref="el => box = el"
            :style="boxStyle"
        >

            <text-canvas />
            <text-canvas />
            
        </div>
    `,
    setup(props){
        const {ref, computed} = Vue


        // props
        const {height, padding, flexDirection} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            height,
            padding,
            flexDirection,
            display: 'flex',
        }))
      

        return{
            box,
            boxStyle,
        }
    }
}