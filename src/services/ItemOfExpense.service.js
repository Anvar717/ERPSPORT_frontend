import ApiService from './api.service'

const ItemOfExpenseService = {
    GetAll(lang) {
        return ApiService.get(`/ItemOfExpense/GetAllItemOfExpenseList`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/ItemOfExpense/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/ItemOfExpense/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/ItemOfExpense/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ItemOfExpense/Delete?id=${id}`)
    }
}
export default ItemOfExpenseService