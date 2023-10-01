import LS from '../../class/commands/ls.js'

export default {
    props: {
        flex: String,
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
        const {flex} = props


        // box
        const box = ref()
        const boxStyle = computed(() => ({
            flex,
            paddingBottom: '20px'
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
        const hex = '0123456789abcedf'
        const textCols = 20
        const logs = []
        const intervalTime = 20
        let startTime = 0
        const prompt = 'user@main-host: ~$ '
        const commands = ['ls', 'cat']
        const ls = new LS()

        let currentCommand = ls.createCommand()
        let cmdIdx = 0
        const randHex = () => hex[~~(Math.random() * hex.length)]
        const generateText = () => {
            return Array.from({length: textCols}, _ => randHex() + randHex()).join('  ')
        }
        const generateCommand = () => {
            // const command = commands[~~(Math.random() * commands.length)]
            const main = 'ls'

            switch(main){
                case 'ls':
                    const num = ~~(Math.random() * 5 + 1)
                    const newCommand = ls.createCommand()

                    logs.push(prompt + currentCommand)
                    logs.push(...ls.createInfos(num))

                    return newCommand
                default:
                    return
            }
        }
        const drawText = () => {
            if(!ctx.value) return

            const {width, height} = wrapper.value.getBoundingClientRect()

            ctx.value.clearRect(0, 0, width, height)


            // logging to canvas
            logs.forEach((log, idx) => {
                const x = 0
                const y = height - fontSize * (logs.length - idx)

                ctx.value.fillText(log, x, y)
            })


            // create new command
            if(cmdIdx >= currentCommand.length){
                currentCommand = generateCommand()
                cmdIdx = 0
            }


            // remove logs out of canvas
            if(logs.length > Math.ceil(height / fontSize)){
                logs.splice(0, logs.length - Math.ceil(height / fontSize))
                // console.log(logs)
            }


            // write command
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