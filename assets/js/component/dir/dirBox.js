const DirBox = {
    props: {
        padding: {
            default: '0',
            type: String
        }
    },
    template: `
        <div
            :style="boxStyle"
        >

            <slot></slot>

        </div>
    `,
    setup(props){
        const {computed} = Vue
        

        // props
        const {padding} = props


        // box
        const boxStyle = computed(() => ({
            width: '100%',
            height: '100%',
            padding,
            overflow: 'auto'
        }))


        return {
            boxStyle
        }
    }
}