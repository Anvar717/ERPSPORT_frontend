import ApiService from './api.service'

const HonoraryTitleService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HonoraryTitle/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HonoraryTitle/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/HonoraryTitle/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/HonoraryTitle/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HonoraryTitle/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HonoraryTitle/CancelApproval?id=${id}`)
    },
}
export default HonoraryTitleService