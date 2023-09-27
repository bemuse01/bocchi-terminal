export default {
    namespaced: true,
    state: {
        audio: null,
    },
    getters: {
        getAudio: (state) => state.audio,
    },
    mutations: {
        setAudio(state, newAudio){
            state.audio = newAudio
        },
    },
    actions: {
        setAudio({commit}, newAudio){
            commit('setAudio', newAudio)
        },
    },
}