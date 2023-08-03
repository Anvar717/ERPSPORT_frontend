import ApiService from './api.service'

const BrandService = {
    GetAll() {
        return ApiService.get(`/Brand/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Brand/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Brand/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/Brand/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Brand/Delete?id=${id}`)
    }
}
export default BrandService