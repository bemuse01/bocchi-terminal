import Curl from '../../class/commands/curl.js'

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
        const {width, height, flex, borderTop, borderRight, borderBottom, borderLeft, padding} = props


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

        const drawText = () => {
            if(!ctx.value) return


            const {width, height} = wrapper.value.getBoundingClientRect()
            ctx.value.clearRect(0, 0, width, height)


            // complete writing command
            if(cmdIdx >= currentCommand.length && !isDling){

                logs.push(prompt + currentCommand)
                dlList = curl.createDlList()
                currentCommand = ''
                isDling = true

            }


            // start downloading
            if(isDling){

                dlList.forEach((item, idx) => {
                    const {done, max, name} = item
                    const progress = ~~((done / max) * dlState.length)
                    const state = dlState.map((s, i) => i <= progress ? '■' : s).join('')
                    const edge = idx === 0 || idx === dlList.length - 1

                    item.done = Math.min(item.done + 1, max)

                    item.text = `  ${name}  ${edge ? '' : state}`
                    
                    ctx.value.fillText(item.text, 0, height - fontSize * (idx + 1))
                })

                // set new values when complete downloading
                if(dlList.every(item => item.done === item.max)){
                    logs.push(...dlList.map(e => e.text).reverse())
                    dlList = []
                    currentCommand = curl.createCommand()
                    isDling = false
                    cmdIdx = 0
                }

            }


            // logging
            logs.forEach((log, idx) => {
                const x = 0
                const y = height - fontSize * ((logs.length - idx) + dlList.length)

                ctx.value.fillText(log, x, y)
            })
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