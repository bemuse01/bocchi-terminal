const VideoCanvas = {
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
        currentVideo: String,
        color: {
            default: '#ffffff',
            type: String
        }
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
        const {onMounted, ref, computed, toRefs, watch} = Vue


        // props
        const {width, height, flex, borderTop, borderRight, borderBottom, borderLeft, padding, color} = props
        const {currentVideo} = toRefs(props)


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
        const canvasStyle = computed(() => ({
            width: '100%',
            height: '100%'
        }))
        const ctx = ref()
        const fontSize = ref(0)
        const initCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height
            ctx.value = canvas.value.getContext('2d')

            const size = Math.min(window.innerWidth, window.innerHeight)
            fontSize.value = ~~(size * FONT_SIZE_RATIO_2)
            
            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize.value}px UbuntuMonoRegular`
            ctx.value.fillStyle = color
        }
        const resizeCanvas = () => {
            const {width, height} = wrapper.value.getBoundingClientRect()

            canvas.value.width = width
            canvas.value.height = height

            const size = Math.min(window.innerWidth, window.innerHeight)
            fontSize.value = ~~(size * FONT_SIZE_RATIO_2)

            ctx.value.textAlign = 'center'
            ctx.value.font = `${fontSize.value}px UbuntuMonoRegular`
            ctx.value.fillStyle = color
        }


        // videos
        const srcs = Data.map(data => data.src)
        let videos = null
        const maxPadding = 3
        const createVideo = () => {
            videos = new Videos(srcs)
        }
        const animateVideo = () => {
            videos.animate()
        }
        const playVideo = (video) => {
            videos.playVideo(video)
        }
        const setVideos = async () => {
            await videos.setVideos()
        }
        const initVideo = async () => {
            createVideo()
            await setVideos()
            playVideo(currentVideo.value)
        }
        const drawLineNumber = (height) => {
            const rows = ~~(height / fontSize.value)

            for(let i = 0; i < rows; i++){
                const text = i.toString()
                const padding = Array.from({length: maxPadding - text.length}, _ => ' ').join('')
                ctx.value.fillText(i, fontSize.value, i * fontSize.value)
            }
        }
        const drawVideo = () => {
            if(!ctx.value) return

            const {width, height} = wrapper.value.getBoundingClientRect()

            ctx.value.clearRect(0, 0, width, height)

            const data = videos.getData()

            if(data.length === 0) return

            const rows = data.length
            const offsetY = height / 2 - (data.length * fontSize.value) / 2

            for(let i = 0; i < rows; i++){
                const characters = data[i].join(' ')
                const x = width / 2
                const y = offsetY + i * fontSize.value

                ctx.value.fillText(characters, x, y)
            }
        }
        watch(currentVideo, (curVideo) => {
            playVideo(curVideo)
        })


        // methods
        const onWindowResize = () => {
            resizeCanvas()
        }
        const animate = () => {
            animateVideo()
            drawVideo()

            requestAnimationFrame(animate)
        }
        const init = () => {
            initCanvas()
            initVideo()

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
            canvasStyle
        }
    }
}