import App from './component/app.js'
import Store from './store/index.js'

const vueApp = Vue.createApp({
    components: {
        'app': App
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')