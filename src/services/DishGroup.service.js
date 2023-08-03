import ApiService from './api.service'

const DishGroupService = {
    GetAll(lang) {
        return ApiService.get(`/DishGroup/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/DishGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/DishGroup/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/DishGroup/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/DishGroup/Delete?id=${id}`)
    }
}
export default DishGroupService