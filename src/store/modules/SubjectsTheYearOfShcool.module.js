import SubjectsInTheSchoolYearService from '@/services/SubjectsInTheSchoolYear.service'

export default {
    state: {
        getting_subjects_list: false,
        subjects_of_year_list: [],
        total_count: 0,
        query_params: {
            Search: '',
            SortColumn: '',
            OrderType: '',
            PageNumber: 1,
            PageLimit: 10,
            SchoolYearId: '',
            SchoolGradeId: ''
        }
    },
    mutations: {
        SET_SUBJECTS_LIST: (state, list) => {
            state.subjects_of_year_list = list
        },
        SET_LOADER: (state, status) => {
            state.getting_subjects_list = status
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
        async getSubjectsList({ state, commit }) {
            try {
                commit('SET_LOADER', true)
                const { data } = await SubjectsInTheSchoolYearService.GetList(state.query_params)
                commit('SET_LOADER', false)
                commit('SET_SUBJECTS_LIST', data.rows)
                commit('SET_TOTAL', data.total)
            } catch (error) {
                commit('SET_LOADER', false)
                commit('SET_SUBJECTS_LIST', [])
                commit('SET_TOTAL', 0)
            }
       }
    },
    getters: {},
    namespaced: true,
}