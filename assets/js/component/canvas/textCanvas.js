import Cat from '../../class/commands/cat.js'
import LS from '../../class/commands/ls.js'
import {FONT_SIZE_RATIO} from '../../const/style.js'

export default {
    props: {
        width: {
            default: 'initial',
            type: String
        },
        height: {
            default: 'initial',
            type: String,
        },
        flex: {
            default: 'initial',
            type: String,
        },
        borderTop: {
            default: 'initial',
            type: String
        },
        borderRight: {
            default: 'initial',
            type: String
        },
        borderBottom: {
            default: 'initial',
            type: String
        },
        borderLeft: {
            default: 'initial',
            type: String
        },
        padding: {
            default: 'initial',
            type: String
        },
        color: {
            default: '#ffffff',
            type: String
        },
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
        const {width, height, flex, borderTop, borderRight, borderBottom, borderLeft, padding, color} = props

        // box
        const box = ref()
        const boxStyle = computed(() => ({
            width,
            height,
            flex,
            borderTop,
            borderRight,
            borderBottom,
            borderLeft,
            padding,
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
        const fontSize = ref(0)
        const initCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')

            const size = Math.min(window.innerWidth, window.innerHeight)
            fontSize.value = ~~(size * FONT_SIZE_RATIO)
            
            ctx.value.font = `${fontSize.value}px UbuntuMonoRegular`
            ctx.value.fillStyle = color
        }
        const resizeCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            const size = Math.min(window.innerWidth, window.innerHeight)
            fontSize.value = ~~(size * FONT_SIZE_RATIO)

            ctx.value.font = `${fontSize.value}px UbuntuMonoRegular`
            ctx.value.fillStyle = color
        }


        // text
        const logs = []
        const intervalTime = 20
        let startTime = 0
        const prompt = 'user@main-host: ~$ '
        const commands = ['ls', 'cat']
        const ls = new LS()
        const cat = new Cat()

        let currentCommand = ls.createCommand()
        let cmdIdx = 0
        const generateCommand = () => {
            const oldMain = currentCommand.split(' ')[0]
            const main = commands[~~(Math.random() * commands.length)]
            // const main = 'ls'
            const num = ~~(Math.random() * 5 + 1)
            let newCommand = ''

            logs.push(prompt + currentCommand)

            switch(oldMain){
                case 'ls':
                    logs.push(...ls.createInfos(num))
                    break
                case 'cat':
                    logs.push(...cat.createInfos(num))
                    break
                default:
                    break
            }

            switch(main){
                case 'ls':
                    newCommand = ls.createCommand()
                    break
                case 'cat':
                    newCommand = cat.createCommand()
                    break
                default:
                    break
            }

            return newCommand
        }
        const drawText = () => {
            if(!ctx.value) return


            const {width, height} = wrapper.value.getBoundingClientRect()
            ctx.value.clearRect(0, 0, width, height)


            // create new command
            if(cmdIdx >= currentCommand.length){
                currentCommand = generateCommand()
                cmdIdx = 0
            }

            
            // logging to canvas
            logs.forEach((log, idx) => {
                const x = 0
                const y = height - fontSize.value * (logs.length - idx)

                ctx.value.fillText(log, x, y)
            })
            // remove logs out of canvas
            if(logs.length > Math.ceil(height / fontSize.value)){
                logs.splice(0, logs.length - Math.ceil(height / fontSize.value))
                // console.log(logs)
            }


            // write command
            const command = prompt + currentCommand.slice(0, cmdIdx++)
            ctx.value.fillText(command, 0, height - fontSize.value / 6)
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