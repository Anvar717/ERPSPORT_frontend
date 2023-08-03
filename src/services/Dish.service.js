import ApiService from './api.service'

const DishService = {
    GetAll() {
        return ApiService.get(`/Dish/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Dish/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Dish/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Dish/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Dish/Delete?id=${id}`)
    }
}
export default DishService