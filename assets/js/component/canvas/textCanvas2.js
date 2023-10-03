import Curl from '../../class/commands/curl.js'

export default {
    props: {
    },
    template: `
        <div
            :ref="el => box = el"
            :style="boxStyle"
        >

            <div
                :ref="el => wrapper = el"
                :style="wrapperStyle"
            >

                <canvas 
                    :ref="el => canvas = el"
                />

            </div>
            
        </div>
    `,
    setup(props){
        const {onMounted, ref, computed} = Vue


        // props
        const {} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            width: '100%',
            height: '100%'
        }))


        // wrapper
        const wrapper = ref()
        const wrapperStyle = computed(() => ({
            width: '100%',
            height: '100%',
            display: 'flex'
        }))


        // canvas
        const canvas = ref()
        const ctx = ref()
        const fontSize = 14
        const initCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')
            
            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }
        const resizeCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            ctx.value.font = `${fontSize}px UbuntuMonoRegular`
            ctx.value.fillStyle = '#ffffff'
        }


        // text
        const logs = []
        const intervalTime = 20
        let startTime = 0
        const prompt = 'user@main-host: ~$ '
        const curl = new Curl()
        const dlState = Array.from({length: 20}, _ => '□')

        let dlList = curl.createDlList()
        let currentCommand = curl.createCommand()
        let cmdIdx = 0
        let isDling = false
        const generateCommand = () => {

        }
        const drawText = () => {
            if(!ctx.value) return

            const {width, height} = wrapper.value.getBoundingClientRect()

            ctx.value.clearRect(0, 0, width, height)

            if(cmdIdx >= currentCommand.length && !isDling){

                isDling = true
                logs.push(prompt + currentCommand)
                currentCommand = ''
                dlList = curl.createDlList()

            }

            if(isDling){
                dlList.forEach((item, idx) => {
                    const {done, max, name} = item
                    const progress = ~~((done / max) * dlState.length)
                    const state = dlState.map((s, i) => i <= progress ? '■' : s).join('')
    
                    item.done = Math.min(item.done + 1, max)

                    item.text = `  ${name}  ${state}`
    
                    ctx.value.fillText(item.text, 0, height - fontSize * (idx + 1))
                })

                if(dlList.every(item => item.done === item.max)){
                    logs.push(...dlList.map(e => e.text).reverse())
                    dlList = []
                    currentCommand = curl.createCommand()
                    isDling = false
                    cmdIdx = 0
                }
            }

            logs.forEach((log, idx) => {
                const x = 0
                const y = height - fontSize * ((logs.length - idx) + dlList.length)

                ctx.value.fillText(log, x, y)
            })

            if(logs.length > Math.ceil(height / fontSize)){
                logs.splice(0, logs.length - Math.ceil(height / fontSize))
                // console.log(logs)
            }

            const command = prompt + currentCommand.slice(0, cmdIdx++)
            ctx.value.fillText(command, 0, height)
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
            wrapper,
            wrapperStyle,
            canvas,
        }
    }
}