import ApiService from './api.service'

const CountryService = {
    GetAll(lang) {
        return ApiService.get(`/CurrencyCourse/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/CurrencyCourse/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/CurrencyCourse/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/CurrencyCourse/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/CurrencyCourse/Delete?id=${id}`)
    }
}
export default CountryService