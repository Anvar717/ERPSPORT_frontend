import ApiService from './api.service'

const StudentGradeMovementService = {
    GetList(isLeaveForSecondYear,fromSchoolYearId,toSchoolYearId,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/StudentGradeMovement/GetList?isLeaveForSecondYear=${isLeaveForSecondYear}&fromSchoolYearId=${fromSchoolYearId}&toSchoolYearId=${toSchoolYearId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,isLeaveForSecondYear) {
        return ApiService.get(`/StudentGradeMovement/Get?id=${id}&isLeaveForSecondYear=${isLeaveForSecondYear}`)
    },
    Update(data) {
        return ApiService.post('/StudentGradeMovement/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/StudentGradeMovement/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/StudentGradeMovement/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/StudentGradeMovement/CancelApproval?id=${id}`)
    }
}
export default StudentGradeMovementService