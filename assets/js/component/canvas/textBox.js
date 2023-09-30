export default {
    props: {
        flex: String,
    },
    template: `
        <div
            :ref="el => box = el"
            :style="boxStyle"
        >
            <canvas 
                :ref="el => canvas = el"
            />
        </div>
    `,
    setup(props){
        const {onMounted, ref, computed} = Vue


        // props
        const {flex} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            flex
        }))


        // canvas
        const canvas = ref()
        const ctx = ref()
        const fontSize = 12
        const initCanvas = () => {
            const {width, height} = box.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            const {width, height} = box.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }


        // text
        const hex = '0123456789abcedf'
        const textCols = 20
        const logs = []
        const intervalTime = 200
        let startTime = 0
        const lineStep = 2
        const randHex = () => hex[~~(Math.random() * hex.length)]
        const generateText = () => {
            return Array.from({length: textCols}, _ => randHex() + randHex()).join('  ')
        }
        const drawText = () => {
            if(!ctx.value) return

            const {width, height} = box.value.getBoundingClientRect()

            ctx.value.clearRect(0, 0, width, height)
            
            const text = generateText()
            logs.push({text, step: 1})

            logs.forEach(log => {
                const {text, step} = log
                const x = 0
                const y = height - fontSize * step * lineStep
                log.step++

                ctx.value.fillText(text, x, y)
            })

            if(logs.length > Math.ceil(height / (fontSize * lineStep))){
                logs.shift()
            }            
        }
        const interval = () => {
            const currentTime = window.performance.now()

            if(currentTime - startTime > intervalTime){
                drawText()
                startTime = currentTime
            }
        }


        // methods
        const onWindowResize = () => {
            resizeCanvas()
        }
        const animate = () => {
            interval()

            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
            animate()

            window.addEventListener('resize', () => onWindowResize())
        } 


        // hooks
        onMounted(() => init())


        return{
            box,
            boxStyle,
            canvas
        }
    }
}