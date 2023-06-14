export default {
    state: {
        isCollapse: false
    },
    mutations: {
        collapsMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}