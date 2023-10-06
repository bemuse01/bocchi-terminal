const vueApp = Vue.createApp({
    components: {
        'app': App
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')