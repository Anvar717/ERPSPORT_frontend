import ApiService from './api.service'

const HeadroomService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Headroom/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/Headroom/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/Headroom/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Headroom/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/Headroom/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/Headroom/CancelApproval?id=${id}`)
    },
}
export default HeadroomService