import ApiService from './api.service'

const UnitOfMeasureService = {
    GetAll() {
        return ApiService.get(`/UnitOfMeasure/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/UnitOfMeasure/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/UnitOfMeasure/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/UnitOfMeasure/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/UnitOfMeasure/Delete?id=${id}`)
    }
}
export default UnitOfMeasureService