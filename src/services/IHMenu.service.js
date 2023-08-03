import ApiService from './api.service'

const IHMenuService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/IHMenu/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/IHMenu/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/IHMenu/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/IHMenu/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/IHMenu/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/IHMenu/CancelApproval?id=${id}`)
    }
}
export default IHMenuService