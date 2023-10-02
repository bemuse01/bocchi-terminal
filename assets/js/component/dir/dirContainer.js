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
            width: '360px',
            height: '100%',
            borderRight: '1px solid #aaa'
        }))


        return {
            containerStyle
        }
    }
}