import ApiService from './api.service'

const HrWorkDayOffService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HrWorkDayOff/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HrWorkDayOff/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HrWorkDayOff/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HrWorkDayOff/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HrWorkDayOff/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HrWorkDayOff/CancelApproval?id=${id}`)
    },
}
export default HrWorkDayOffService