import ApiService from './api.service'

const RegionTypeService = {
    GetAll(lang) {
        return ApiService.get(`/RegionType/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/RegionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/RegionType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/RegionType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/RegionType/Delete?id=${id}`)
    }
}
export default RegionTypeService