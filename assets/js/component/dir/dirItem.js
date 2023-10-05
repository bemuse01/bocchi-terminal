import {BORDER} from '../../const/style.js'

export default {
    props: {
        name: String,
        depth: Number,
        state: Number,
        visible: Boolean,
        hover: Boolean,
    },
    template: `
        <div
            class="item dir-item"
            :style="dirStyle"
        >

            <span
                v-for="pad in padding"
                :style="pad.style"
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
        const {visible, hover} = toRefs(props)


        // dir
        const display = computed(() => visible.value ? 'flex' : 'none')
        const dirStyle = computed(() => ({
            width: '100%',
            padding: '0 0 0 6px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            display: display.value
        }))
        const border = computed(() => hover.value ? BORDER : '1px solid transparent')
        const padding = computed(() => Array.from({length: depth}, (_, key) => ({
            key, 
            text: '\xa0\xa0',
            style: {
                height: '100%',
                borderLeft: border.value
            }
        })))


        return{
            dirStyle,
            name,
            padding
        }
    }
}