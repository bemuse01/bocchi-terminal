export default {
    namespaced: true,
    state: {
        currentVideo: 'bocchi.mp4',
    },
    getters: {
        getCurrentVideo: (state) => state.currentVideo,
    },
    mutations: {
        setCurrentVideo(state, video){
            state.currentVideo = video
        },
    },
    actions: {
        setCurrentVideo({commit}, video){
            commit('setCurrentVideo', video)
        },
    },
}