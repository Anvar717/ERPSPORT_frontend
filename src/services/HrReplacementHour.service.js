import ApiService from './api.service'

const HrReplacementHourService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HrReplacementHour/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HrReplacementHour/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HrReplacementHour/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HrReplacementHour/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/HrReplacementHour/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/HrReplacementHour/CancelApproval?id=${id}`, data)
    },
}
export default HrReplacementHourService