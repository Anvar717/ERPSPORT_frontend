import ApiService from './api.service'

const SportStudentMovementService = {
    GetList(SchoolYearId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportStudentMovement/GetList?SchoolYearId=${SchoolYearId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/SportStudentMovement/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/SportStudentMovement/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SportStudentMovement/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/SportStudentMovement/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/SportStudentMovement/CancelApproval?id=${id}`)
    },
}
export default SportStudentMovementService