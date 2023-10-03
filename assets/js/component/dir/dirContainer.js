import {DIR_CONTAINER_WIDTH} from '../../const/style.js'

export default {
    template: `
        <div
            id="dir-container" 
            :style="containerStyle"
        >
        </div>
    `,
    setup(){
        const {computed} = Vue
        
        
        // container
        const containerStyle = computed(() => ({
            position: 'absolute',
            left: '0',
            width: `${DIR_CONTAINER_WIDTH}px`,
            height: '100%',
        }))


        return {
            containerStyle
        }
    }
}