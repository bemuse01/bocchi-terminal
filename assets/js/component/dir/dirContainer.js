import {DIR_CONTAINER_WIDTH} from '../../const/style.js'
import FileTree from '../../../src/data/file_tree.js'
import DirBox from './dirBox.js'
import DirItem from './dirItem.js'
import FileItem from './fileItem.js'

export default {
    components: {
        'dir-box': DirBox,
        'dir-item': DirItem,
        'file-item': FileItem
    },
    template: `
        <div
            id="dir-container" 
            :style="containerStyle"
        >

            <dir-box
                padding="6px"
            >

                <template
                    v-for="item in items"
                >

                    <dir-item
                        v-if="item.type === 'dir'"
                        :name="item.name"
                        :depth="item.depth"
                        :visible="item.visible"
                        @click="onClickDir(item)"
                    />

                    <file-item
                        v-else
                        :name="item.name"
                        :depth="item.depth"
                        :visible="item.visible"
                        @click="onClickFile(item)"
                    />

                </template>

            </dir-box>

        </div>
    `,
    setup(){
        const {ref, computed, onMounted} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        
        
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
                const {name, type, parent, state, children} = child
                items.value.push({name, type, state, parent, parents: [], depth, visible: true, children: children.map(e => e.name)})
                searchTree(child, depth, [])
            })
        }
        const searchTree = (tree, depth, parents) => {
            const {name, children, state} = tree

            parents.push(name)
            depth++

            if(!children) return

            children.forEach(child => {
                items.value.push({
                    name: child.name, 
                    type: child.type, 
                    state: child.state, 
                    parent: name, parents, 
                    visible: state ? true : false, 
                    children: child.children ? child.children.map(e => e.name) : [],
                    depth
                })
                if(child.children) searchTree(child, depth, [...parents])
            })
        }


        // dir
        const searchChildren = (item) => {
            if(item.state){
                items.value.forEach(item2 => {
                    if(item.children.includes(item2.name)) {
                        item2.visible = true
                        searchChildren(item2)
                    }
                })
            }
        }
        const onClickDir = (item) => {
            const {name} = item
            item.state = !item.state

            if(item.state){
                items.value.forEach(item => {
                    if(item.parent === name){
                        item.visible = true
                        searchChildren(item)
                    }
                })
            }else{
                items.value.forEach(item => {
                    if(item.parents.includes(name)) item.visible = false
                })
            }
        }


        // file
        const onClickFile = (item) => {
            const {name} = item
            store.dispatch('video/setCurrentVideo', name)
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
            items,
            onClickDir,
            onClickFile
        }
    }
}