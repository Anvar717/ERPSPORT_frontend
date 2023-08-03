import ApiService from './api.service'

const HrEmpSendTrainService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HrEmpSendTrain/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HrEmpSendTrain/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HrEmpSendTrain/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HrEmpSendTrain/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HrEmpSendTrain/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HrEmpSendTrain/CancelApproval?id=${id}`)
    },
}
export default HrEmpSendTrainService