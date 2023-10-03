import TextCanvas from './textCanvas.js'

export default {
    components: {
        'text-canvas': TextCanvas
    },
    props: {
        height: String,
        flex: String,
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
        const {flex, height} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            height,
            padding: '12px 12px 12px 12px',
            display: 'flex',
            flexDirection: 'row'
        }))
      

        return{
            box,
            boxStyle,
        }
    }
}