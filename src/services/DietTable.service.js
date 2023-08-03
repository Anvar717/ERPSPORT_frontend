import ApiService from './api.service'

const DietTableService = {
    GetAll(lang) {
        return ApiService.get(`/DietTable/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/DietTable/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/DietTable/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/DietTable/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/DietTable/Delete?id=${id}`)
    }
}
export default DietTableService