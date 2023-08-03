import ApiService from './api.service'

const PositionClassificationService = {
    GetAll(lang) {
        return ApiService.get(`/PositionClassification/GetAll`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PositionClassification/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/PositionClassification/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/PositionClassification/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PositionClassification/Delete?id=${id}`)
    }
}
export default PositionClassificationService