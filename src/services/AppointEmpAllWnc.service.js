import ApiService from './api.service'

const AppointEmpAllWncService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppointEmpAllWnc/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AppointEmpAllWnc/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AppointEmpAllWnc/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AppointEmpAllWnc/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AppointEmpAllWnc/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AppointEmpAllWnc/CancelApproval?id=${id}`, data)
    },
}
export default AppointEmpAllWncService