import ApiService from './api.service'

const IHIncomeService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/IHIncome/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/IHIncome/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/IHIncome/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/IHIncome/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/IHIncome/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/IHIncome/CancelApproval?id=${id}`)
    }
}
export default IHIncomeService