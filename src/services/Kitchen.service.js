import ApiService from './api.service'

const KitchenService = {
    GetAll() {
        return ApiService.get(`/Kitchen/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Kitchen/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Kitchen/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Kitchen/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Kitchen/Delete?id=${id}`)
    }
}
export default KitchenService