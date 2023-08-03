import StudentFinalMarkService from '@/services/StudentFinalMark.service'

export default {
    state: {
        getting_students_list: false,
        students_list: [],
        total_count: 0,
        query_params: {
            Search: '',
            SortColumn: '',
            OrderType: '',
            PageNumber: 1,
            PageLimit: 10,
            SchoolGradeId: '',
            schoolyearid: 0,
            oblastid: 0,
            regionid: 0,
            organizationid: 0,
            personname: '',
            personpinfl: '',
            hasstudentfinalmark: null
        }
    },
    mutations: {
        SET_STUDENTS_LIST: (state, list) => {
            state.students_list = list
        },
        SET_LOADER: (state, status) => {
            state.getting_students_list = status
        },
        /**
         * @param {Store State} state
         * @param { param_name: string; param_value: string | number }
         */
        SET_QUERY_PARAM: (state, param_object) => {
            state.query_params[param_object.name] = param_object.value
        },
        SET_TOTAL: (state, total) => {
            state.total_count = total
        }
    },
    actions: {
        async getStudentsList({ state, commit }) {
            try {
                commit('SET_LOADER', true)
                const { data } = await StudentFinalMarkService.GetList(state.query_params)
                commit('SET_LOADER', false)
                commit('SET_STUDENTS_LIST', data.rows)
                commit('SET_TOTAL', data.total)
            } catch (error) {
                commit('SET_LOADER', false)
                commit('SET_STUDENTS_LIST', [])
                commit('SET_TOTAL', 0)
            }
       }
    },
    getters: {},
    namespaced: true,
}