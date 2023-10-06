const DirContainer = {
    components: {
        'dir-box': DirBox,
        'dir-item': DirItem,
        'file-item': FileItem
    },
    template: `
        <div
            id="dir-container" 
            :style="containerStyle"
            @mouseenter="onMouseenter"
            @mouseleave="onMouseleave"
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
                        :hover="hover"
                    />

                    <file-item
                        v-else
                        :name="item.name"
                        :depth="item.depth"
                        :visible="item.visible"
                        @click="onClickFile(item)"
                        :hover="hover"
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
        const hover = ref(false)
        const containerStyle = computed(() => ({
            position: 'absolute',
            left: '0',
            width: `${DIR_CONTAINER_WIDTH}px`,
            height: '100%',
            color: MAIN_COLOR,
        }))
        const onMouseenter = () => {
            hover.value = true
        }
        const onMouseleave = () => {
            hover.value = false
        }


        // data
        const items = ref([])
        let depth = 0
        const initItems = () => {
            FileTree.body.forEach(child => {
                const {id, name, type, parent, state, children} = child
                items.value.push({id, name, type, state, parent, parents: [], depth, visible: true, children: children.map(e => e.name)})
                searchTree(child, depth, [])
            })
        }
        const searchTree = (tree, depth, parents) => {
            const {id, children, state} = tree

            parents.push(id)
            depth++

            if(!children) return

            children.forEach(child => {
                items.value.push({
                    id: child.id,
                    name: child.name, 
                    type: child.type, 
                    state: child.state, 
                    parent: id, 
                    parents, 
                    visible: state ? true : false, 
                    children: child.children ? child.children.map(e => e.id) : [],
                    depth
                })
                if(child.children) searchTree(child, depth, [...parents])
            })
        }


        // dir
        const searchChildren = (item) => {
            if(item.state){
                items.value.forEach(item2 => {
                    if(item.children.includes(item2.id)) {
                        item2.visible = true
                        searchChildren(item2)
                    }
                })
            }
        }
        const onClickDir = (item) => {
            const {id} = item
            item.state = !item.state

            if(item.state){
                items.value.forEach(item => {
                    if(item.parent === id){
                        item.visible = true
                        searchChildren(item)
                    }
                })
            }else{
                items.value.forEach(item => {
                    if(item.parents.includes(id)) item.visible = false
                })
            }
        }


        // file
        const onClickFile = (item) => {
            const {name, type} = item
            if(type !== 'video') return
            store.dispatch('video/setCurrentVideo', name)
        }


        // methods
        const init = () => {
            initItems()
        }


        // hooks
        onMounted(() => init())


        return {
            containerStyle,
            items,
            hover,
            onMouseenter,
            onMouseleave,
            onClickDir,
            onClickFile,
        }
    }
}