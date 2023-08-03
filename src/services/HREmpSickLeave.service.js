import ApiService from './api.service'

const HREmpSickLeaveService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HREmpSickLeave/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HREmpSickLeave/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HREmpSickLeave/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HREmpSickLeave/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/HREmpSickLeave/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/HREmpSickLeave/CancelApproval?id=${id}`, data)
    },
    GetUnpaidHREmpSickLeaveList(Search, SortColumn, OrderType, PageNumber, PageLimit, StartDate, EndDate) {
        return ApiService.get(`/HREmpSickLeave/GetUnpaidHREmpSickLeaveList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&StartDate=${StartDate}&EndDate=${EndDate}`)
    },
}
export default HREmpSickLeaveService