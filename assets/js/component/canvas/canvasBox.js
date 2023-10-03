export default {
    props: {
        width: {
            default: 'initial',
            type: String
        },
        height: {
            default: 'initial',
            type: String,
        },
        flex: {
            default: 'initial',
            type: String,
        },
        padding: {
            default: 'initial',
            type: String
        },
        gap: {
            default: 'initial',
            type: String,   
        },
        flexDirection: {
            default: 'row',
            type: String
        },
        borderTop: {
            default: 'initial',
            type: String
        },
        borderRight: {
            default: 'initial',
            type: String
        },
        borderBottom: {
            default: 'initial',
            type: String
        },
        borderLeft: {
            default: 'initial',
            type: String
        },
    },
    template: `
        <div
            class="canvas-box"
            :ref="el => box = el"
            :style="boxStyle"
        >

            <slot></slot>
            
        </div>
    `,
    setup(props){
        const {ref, computed} = Vue


        // props
        const {width, height, padding, flexDirection, borderTop, borderRight, borderBottom, borderLeft, gap} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            width,
            height,
            padding,
            gap,
            flexDirection,
            borderTop,
            borderRight,
            borderBottom,
            borderLeft,
            display: 'flex',
        }))
      

        return{
            box,
            boxStyle,
        }
    }
}