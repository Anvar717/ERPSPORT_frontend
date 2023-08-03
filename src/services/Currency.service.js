import ApiService from './api.service'

const CurrencyService = {
    GetAll(lang) {
        return ApiService.get(`/Currency/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Currency/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Currency/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Currency/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Currency/Delete?id=${id}`)
    }
}
export default CurrencyService