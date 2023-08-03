import ApiService from './api.service'

const HeadOrgSchoolGradeService = {
    GetList(schoolyearid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HeadOrgSchoolGrade/GetList?schoolyearid=${schoolyearid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HeadOrgSchoolGrade/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HeadOrgSchoolGrade/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HeadOrgSchoolGrade/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HeadOrgSchoolGrade/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HeadOrgSchoolGrade/CancelApproval?id=${id}`)
    },
}
export default HeadOrgSchoolGradeService