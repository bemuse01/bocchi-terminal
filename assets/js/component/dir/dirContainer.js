import {DIR_CONTAINER_WIDTH} from '../../const/style.js'
import FileTree from '../../../src/data/file_tree.js'
import DirBox from './dirBox.js'

export default {
    components: {
        'dir-box': DirBox
    },
    template: `
        <div
            id="dir-container" 
            :style="containerStyle"
        >

            <dir-box
                padding="6px"
            >

                <div
                >



                </div>

            </dir-box>

        </div>
    `,
    setup(){
        const {ref, computed, onMounted} = Vue
        
        
        // container
        const containerStyle = computed(() => ({
            position: 'absolute',
            left: '0',
            width: `${DIR_CONTAINER_WIDTH}px`,
            height: '100%',
        }))


        // data
        const items = ref([])
        let depth = 0
        const initItems = () => {
            FileTree.body.forEach(child => {
                const {name, type, parent, state} = child
                items.value.push({name, type, state, parent, parents: [], depth})
                searchTree(child, depth, [])
            })
        }
        const searchTree = (tree, depth, parents) => {
            const {name, children} = tree

            parents.push(name)
            depth++

            if(!children) return

            children.forEach((child, idx) => {
                items.value.push({name: child.name, type: child.type, state: child.state, parents, depth})
                if(child.children) searchTree(child, depth, [...parents])
            })
        }


        // methods
        const init = () => {
            initItems()
            console.log(items)
        }


        // hooks
        onMounted(() => init())


        return {
            containerStyle,
            items
        }
    }
}