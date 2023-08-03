import ApiService from './api.service'

const HigherEduClassifierService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/HigherEduClassifier/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/HigherEduClassifier/Get?id=${id}`)
    },
    GetAll() {
        return ApiService.get('/HigherEduClassifier/GetAll')
    },
    Update(data) {
        return ApiService.post('/HigherEduClassifier/Update',data)
    },
    Delete(id) {
        return ApiService.delete(`/HigherEduClassifier/Delete?id=${id}`)
    }
}
export default HigherEduClassifierService