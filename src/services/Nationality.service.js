import ApiService from './api.service'

const NationalityService = {
    GetAll(lang) {
        return ApiService.get(`/Nationality/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Nationality/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Nationality/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Nationality/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Nationality/Delete?id=${id}`)
    }
}
export default NationalityService