import ApiService from './api.service'

const IHExpenditureService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/IHExpenditure/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/IHExpenditure/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/IHExpenditure/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/IHExpenditure/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/IHExpenditure/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/IHExpenditure/CancelApproval?id=${id}`)
    }
}
export default IHExpenditureService