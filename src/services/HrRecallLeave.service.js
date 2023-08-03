import ApiService from './api.service'

const HrRecallLeaveService = {

    GetAll(personid) {
        return ApiService.get(`HREmpLeaveOrder/GetAll?personid=${personid}`)
    },
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HrRecallLeave/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HrRecallLeave/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HrRecallLeave/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HrRecallLeave/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HrRecallLeave/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HrRecallLeave/CancelApproval?id=${id}`)
    },
}
export default HrRecallLeaveService