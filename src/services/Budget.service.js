import ApiService from './api.service'

const BudgetService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Budget/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Budget/Get?id=${id}`)
    },
    GetOrganizationAccountList() {
        return ApiService.get('/Budget/GetOrganizationAccountList/')
    },
    Update(data) {
        return ApiService.post('/Budget/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Budget/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/Budget/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/Budget/CancelApproval?id=${id}`)
    }
}
export default BudgetService