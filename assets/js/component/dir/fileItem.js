export default {
    props: {
        name: String,
        depth: Number,
        state: Number,
        visible: Boolean
    },
    template: `
        <div
            class="item file-item"
            :style="fileStyle"
        >

            <span
                v-for="pad in padding"
            >
                {{pad.text}}
            </span>
            <span>{{name}}</span>
            
        </div>
    `,
    setup(props){
        const {computed, toRefs} = Vue


        // props
        const {name, state, depth} = props
        const {visible} = toRefs(props)


        // file
        const display = computed(() => visible.value ? 'block' : 'none')
        const fileStyle = computed(() => ({
            width: '100%',
            padding: '3px 0px 3px 6px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            display: display.value
        }))
        const padding = computed(() => Array.from({length: depth}, (_, key) => ({
            key, 
            text: '\xa0\xa0',
            // style: {
            //     height: '100%',
            //     borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
            // }
        })))


        return{
            fileStyle,
            name,
            padding
        }
    }
}