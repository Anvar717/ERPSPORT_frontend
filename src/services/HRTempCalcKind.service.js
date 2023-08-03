import ApiService from './api.service'

const HRTempCalcKindService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HRTempCalcKind/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HRTempCalcKind/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HRTempCalcKind/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HRTempCalcKind/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HRTempCalcKind/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HRTempCalcKind/CancelApproval?id=${id}`)
    },
}
export default HRTempCalcKindService