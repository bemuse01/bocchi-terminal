export default {
    props: {
        name: String,
        depth: Number,
        state: Number,
    },
    template: `
        <div
            :style="dirStyle"
        >
        
            <span>{{name}}</span>
            
        </div>
    `,
    setup(props){
        const {toRefs, computed} = Vue


        // props
        const {name} = props
        const {state, depth} = toRefs(props)


        // dir
        const dirStyle = computed(() => ({
            width: '100%',
            height: '20px'
        }))


        return{
            dirStyle,
            name
        }
    }
}