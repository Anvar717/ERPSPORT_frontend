import ApiService from './api.service'

const GuestRegistrationService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/GuestRegistration/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/GuestRegistration/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/GuestRegistration/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/GuestRegistration/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/GuestRegistration/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/GuestRegistration/CancelApproval?id=${id}`)
    },
}
export default GuestRegistrationService