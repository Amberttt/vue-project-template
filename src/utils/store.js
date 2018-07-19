import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const common = {
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        }
    },
    getters: {
        // isLoading(state) {
        //     return state.isLoading;
        // }
        isLoading: state => state.isLoading
    }
}
const store = new Vuex.Store({
    modules:  {
        common
    }
});
export default store;