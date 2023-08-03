import ApiService from './api.service'

const ExpenditureTypeService = {
    GetAll() {
        return ApiService.get(`/ExpenditureType/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/ExpenditureType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/ExpenditureType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/ExpenditureType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ExpenditureType/Delete?id=${id}`)
    }
}
export default ExpenditureTypeService