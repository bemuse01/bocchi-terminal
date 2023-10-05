import DirContainer from './dir/dirContainer.js'
import CanvasContainer from './canvas/canvasContainer.js'
import {BORDER, MAIN_COLOR} from '../const/style.js'

export default {
    components: {
        'dir-container': DirContainer,
        'canvas-container': CanvasContainer,
    },
    template: `
        <div 
            id="app"
            :style="appStyle"
        >

            <dir-container />
            <canvas-container />

        </div>
    `,
    setup(){
        const {computed} = Vue


        // app
        const appStyle = computed(() => ({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            border: `2px solid ${MAIN_COLOR}33`
        }))

        
        return{
            appStyle
        }
    }
}