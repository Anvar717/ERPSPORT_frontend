import ApiService from './api.service'

const AppealResponseService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppealResponse/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/AppealResponse/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AppealResponse/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/AppealResponse/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/AppealResponse/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/AppealResponse/CancelApproval?id=${id}`)
    },
    Send(id) {
        return ApiService.post(`/AppealResponse/Send?id=${id}`)
    },
}
export default AppealResponseService