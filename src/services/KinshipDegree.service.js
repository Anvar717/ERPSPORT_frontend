import ApiService from './api.service'

const KinshipDegreeService = {
    GetAll(lang) {
        return ApiService.get(`/KinshipDegree/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/KinshipDegree/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/KinshipDegree/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/KinshipDegree/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/KinshipDegree/Delete?id=${id}`)
    }
}
export default KinshipDegreeService