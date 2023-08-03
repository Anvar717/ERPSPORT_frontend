import ApiService from './api.service'

const MenuTypeService = {
    GetAll(lang) {
        return ApiService.get(`/MenuType/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/MenuType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/MenuType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/MenuType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/MenuType/Delete?id=${id}`)
    }
}
export default MenuTypeService