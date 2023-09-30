export default {
    props: {
        ctx: Object,
        fontSize: Number,
    },
    template: `
        <div>
        </div>
    `,
    setup(props){
        const {onMounted, toRefs} = Vue

        
        // props
        const {fontSize} = props
        const {ctx} = toRefs(props)


        // text
        const hex = '0123456789abcedf'
        const textCols = 20
        const logs = []
        const intervalTime = 100
        let startTime = 0
        const randHex = () => hex[~~(Math.random() * hex.length)]
        const generateText = () => {
            return Array.from({length: textCols}, _ => randHex() + randHex()).join('  ')
        }
        const drawText = () => {
            if(!ctx.value) return

            const width = window.innerWidth
            const height = window.innerHeight

            ctx.value.clearRect(0, 0, width, height)
            
            const text = generateText()
            logs.push({text, step: 0})

            logs.forEach(log => {
                const {text, step} = log
                const x = 0
                const y = height - fontSize * step * 2
                log.step++

                ctx.value.fillText(text, x, y)
            })

            if(logs.length > Math.ceil(height / fontSize)){
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
        const animate = () => {
            interval()

            requestAnimationFrame(animate)
        }
        const init = () => {
            animate()
        } 


        // hooks
        onMounted(() => init())
    }
}