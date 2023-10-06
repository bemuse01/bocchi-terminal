const VideoStore = {
    namespaced: true,
    state: {
        currentVideo: Data[0].filename,
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