import ApiService from './api.service'

const IHGroupService = {
    GetAll() {
        return ApiService.get(`/IHGroup/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/IHGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/IHGroup/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/IHGroup/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/IHGroup/Delete?id=${id}`)
    }
}
export default IHGroupService