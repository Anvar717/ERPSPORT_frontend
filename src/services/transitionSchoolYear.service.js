import ApiService from './api.service'

const TransitionSchoolYearService = {
    GetList(fromSchoolYearId,toSchoolYearId,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TransitionSchoolYear/GetList?fromSchoolYearId=${fromSchoolYearId}&toSchoolYearId=${toSchoolYearId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/TransitionSchoolYear/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/TransitionSchoolYear/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/TransitionSchoolYear/Update', data)
    },
    Approve(id,inn) {
        return ApiService.post(`/TransitionSchoolYear/Approve?id=${id}&inn=${inn}`)
    },
    CancelApproval(id,inn) {
        return ApiService.post(`/TransitionSchoolYear/CancelApproval?id=${id}&inn=${inn}`)
    },
    GetDetail(id) {
        return ApiService.get(`/TransitionSchoolYear/GetDetail?id=${id}`)
    },
    GetRemainStudents(id) {
        return ApiService.get(`/TransitionSchoolYear/GetRemainStudents?id=${id}`)
    },
    RefreshApprove(id, inn) {
        return ApiService.post(`/TransitionSchoolYear/RefreshApprove?id=${id}&inn=${inn}`)
    },
    GetStudents(transitionSchoolYearId,schoolGradeId,schoolGradeLetterId) {
        return ApiService.get(`/TransitionSchoolYear/GetStudents?transitionSchoolYearId=${transitionSchoolYearId}&schoolGradeId=${schoolGradeId}&schoolGradeLetterId=${schoolGradeLetterId}`)
    }

}
export default TransitionSchoolYearService