import ApiService from './api.service'

const PhysicalTrainingTypeService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/PhysicalTrainingType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/PhysicalTrainingType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/PhysicalTrainingType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/PhysicalTrainingType/Delete?id=${id}`)
    },
    GetAll() {
        return ApiService.get('/PhysicalTrainingType/GetAll')
    }
}
export default PhysicalTrainingTypeService