import ApiService from './api.service'

const AppointDirFondAllwncService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppointDirFondAllwnc/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AppointDirFondAllwnc/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AppointDirFondAllwnc/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AppointDirFondAllwnc/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AppointDirFondAllwnc/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AppointDirFondAllwnc/CancelApproval?id=${id}`, data)
    },
}
export default AppointDirFondAllwncService