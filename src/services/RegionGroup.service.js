import ApiService from './api.service'

const RegionGroupService = {
    GetAll(lang) {
        return ApiService.get(`/RegionGroup/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/RegionGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/RegionGroup/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/RegionGroup/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/RegionGroup/Delete?id=${id}`)
    }
}
export default RegionGroupService