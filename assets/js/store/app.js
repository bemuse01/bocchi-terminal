export default {
    namespaced: true,
    state: {
        app: null,
    },
    getters: {
        getApp: (state) => state.app,
    },
    mutations: {
        setApp(state, newApp){
            state.app = newApp
        },
    },
    actions: {
        setApp({commit}, newApp){
            commit('setApp', newApp)
        },
    },
}