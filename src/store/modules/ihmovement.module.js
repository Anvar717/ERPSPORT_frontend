import ReportIHService from "@/services/ReportIH.service";
export default {
    namespaced: true,
    state: {
        HelperForMax : []
    },
    mutations: {
        toState(state, data) {
            state.HelperForMax = data
        }
    },
    actions: {
        async WriteState({ commit }, OnDate, fromdepartment, fromresponsibleperson, ihname, Isbydocument, excludedocumentid, excludetableid) {
            return await ReportIHService.GetIHRestForIHMovement(OnDate, fromdepartment, fromresponsibleperson, ihname, Isbydocument, excludedocumentid, excludetableid).then(res => {
                commit('toState', res.data)
            })
        }
    },
    getters : {}
}